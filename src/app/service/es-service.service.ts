import { Injectable } from "@angular/core";
// import { SearchResponse } from "elasticsearch";
import { Client, SearchResponse } from "elasticsearch-browser";
import { Observable, from, throwError as observableThrowError } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class EsServiceService {
  private _client: Client;
  private userInfo: any;
  constructor() {
    if (!this._client) {
      this.connect();
    }
    this.userInfo;
  }

  isAvailable(): any {
    return this._client.ping(
      {
        requestTimeout: 30000,
      },
      function (error) {
        if (error) {
          console.error("elasticsearch cluster is down!");
        } else {
          console.log("All is well");
        }
      }
    );
  }

  // 新增 索引
  // 新增时，需要指定索引，类型，和id，还有保存的内容：
  addDataByIndex(index, type, data): Observable<SearchResponse<{}>> {
    // data["createdUserName"] = this.userInfo.username;
    // data["createdUserId"] = this.userInfo.id;
    data["createdTime"] = new Date();
    return from(
      this._client.create({
        index,
        type,
        id: this.uuid(),
        body: data,
      }) as Promise<SearchResponse<{}>>
    );
  }

  /**
   * 复杂查询
   * client.search({
   *   index:'myindex',
   *   body:{
   *       query:{
   *           match:{
   *               title:'test'
   *              }
   *          },
   *       facets:{
   *           tags:{
   *               terms:{
   *                   field:'tags'
   *                  }
   *              }
   *          }
   *      }
   *  }
   *
   */

  searchIndex(index, from1, size, query): Observable<SearchResponse<{}>> {
    let body = {
      query: {
        bool: {
          must: [
            // 必须满足
            {
              match: {
                createdUserId: this.userInfo.id,
              },
            },
          ],
        },
      },
      sort: [
        {
          createdTime: {
            order: "desc",
          },
        },
      ],
    };
    if (query) {
      body.query.bool["should"] = query;
      body.query.bool["minimum_should_match"] = 1;
    }

    return from(
      this._client.search({
        index,
        from: from1,
        size,
        body,
      }) as Promise<SearchResponse<{}>>
    );
  }

  // 修改
  updateByIndex(index, type, id, body): Observable<SearchResponse<{}>> {
    return from(
      this._client.update({
        index,
        type,
        id,
        body: {
          doc: body,
        },
      }) as Promise<SearchResponse<{}>>
    );
  }

  // 判断文档是否存在 可以用count 方法
  existsData(index, body): Observable<SearchResponse<{}>> {
    return from(
      this._client.count({
        index,
        body,
      }) as Promise<SearchResponse<{}>>
    );
  }

  // 复合查询
  searchCount(index, body): Observable<SearchResponse<{}>> {
    return from(
      this._client.search({
        index,
        body,
      }) as Promise<SearchResponse<{}>>
    );
  }

  // 删除
  deleteData(index, type, ids): Observable<SearchResponse<{}>> {
    let body = [];
    for (let i = 0; i < ids.length; i++) {
      body.push({
        delete: {
          _index: index,
          _type: type,
          _id: ids[i],
        },
      });
    }
    return from(
      this._client.bulk({
        body,
      }) as Promise<SearchResponse<{}>>
    );
    // return from(
    //   this._client.delete({
    //     index,
    //     type,
    //     ids,
    //     //refresh:''
    //   }) as Promise<SearchResponse<{}>>
    // );
  }
  // 批量操作
  /**
  * client.bulk({ // 示例为一次进行3个操作
  body: [
    // action description
    { index:  { _index: 'myindex', _type: 'mytype', _id: 1 } },
     // the document to index
    { title: 'foo' },
    // action description
    { update: { _index: 'myindex', _type: 'mytype', _id: 2 } },
    // the document to update
    { doc: { title: 'foo' } },
    // action description
    { delete: { _index: 'myindex', _type: 'mytype', _id: 3 } },
    // no document needed for this delete
  ]
}
  * 
  * 
  * 
  */

  // 更新索引字段 //比如 "fielddata": true
  updateByIndexFilled(index, type, body): Observable<SearchResponse<{}>> {
    return from(
      this._client.indices.putMapping({
        index,
        type,
        body,
      }) as Promise<SearchResponse<{}>>
    );
  }

  private connect(): void {
    this._client = new Client({
      host: "http://117.73.2.85:9200/",
      log: "error",
      apiVersion: "6.8",
    });
  }
  private uuid() {
    return (
      (65536 * (1 + Math.random())).toString(16).substring(1) +
      "-" +
      (65536 * (1 + Math.random())).toString(16).substring(1)
    );
  }
  private handleError() {
    return (error: any): Observable<any> => {
      console.log(error);
      return observableThrowError(error);
    };
  }
}
