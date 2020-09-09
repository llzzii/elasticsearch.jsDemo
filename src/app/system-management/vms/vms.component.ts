import { IfStmt } from "@angular/compiler";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { of } from "rxjs";

import { EsServiceService } from "../../service/es-service.service";
import { IndexAndType } from "../../utils/indexAndType";

@Component({
  selector: "app-vms",
  templateUrl: "./vms.component.html",
  styleUrls: ["./vms.component.css"],
})
export class VmsComponent implements OnInit {
  @ViewChild("addModel", { static: true }) addModel;
  @ViewChild("updateModel", { static: true }) updateModel;
  @ViewChild("addFormComponent", { static: true }) addFormComponent;
  @ViewChild("updateFormComponent", { static: true }) updateFormComponent;
  isLoading = true;
  allChecked = false;
  checkedNumber = 0;
  displayData = [];
  dataSet = [];
  updateData = [];
  canDelData = [];
  popoverVisible = [];
  submitValue: string; // 编辑的实例name
  hasError = false; // 是否未通过验证
  error = null; // 错误信息

  current = 1;
  pageSize = 10;
  totalCount = 0;
  queryValue = "";
  addForm;
  updateForm;
  indeterminate: boolean;
  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private esServiceService: EsServiceService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      vmName: [null, [Validators.required]],
      ip: [null, [Validators.required]],
      device: [null, [Validators.required]],
      logs: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
    this.updateForm = this.fb.group({
      vmName: [null, [Validators.required]],
      //   ip: [null, [Validators.required]],
      device: [null, [Validators.required]],
      logs: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  getTableDatas(reset: boolean = false, queryValue = "") {
    this.isLoading = true;

    let query = null;
    if (queryValue !== "") {
      query = [
        {
          match: {
            vmName: {
              query: queryValue,
              //   fuzziness: "AUTO",
              //   minimum_should_match: "2",
            },
          },
        },
        {
          match: {
            ip: {
              query: queryValue,
              //   fuzziness: "AUTO",
              //   minimum_should_match: "2",
            },
          },
        },
      ];
    }
    if (reset) {
      query = null;
      this.current = 1;
      this.queryValue = "";
    }
    let current = this.current - 1;
    this.esServiceService
      .searchIndex(
        IndexAndType.VM_INDEX,
        current * this.pageSize,
        this.pageSize,
        query
      )
      .subscribe((data) => {
        this.totalCount = data.hits.total;
        this.displayData = data.hits.hits;
        this.dataSet = data.hits.hits;
        this.isLoading = false;
      });
  }

  /**
   * @description 更新displayData为当前页数据
   * @date 2019-08-16
   * @param {any[]} $event当前页数据
   * @memberof ListComponent
   */
  currentPageDataChange($event: any[]): void {
    this.displayData = $event;
  }

  createModel() {
    this.modalService.create({
      nzTitle: "添加资产",
      nzContent: this.addModel,
      nzOnOk: () => {
        let isValid = this.submitData();
        return isValid;
      },
    });
  }

  editModel(data) {
    this.updateData = data;
    this.modalService.create({
      nzTitle: "修改资产",
      nzContent: this.updateModel,
      nzOnOk: () => {
        let isValid = this.getUpdateData();
        return isValid;
      },
    });
  }

  updateIndex() {
    let query = {
      properties: {
        content: {
          type: "text",
          fielddata: true,
        },
      },
    };
    this.esServiceService
      .updateByIndexFilled(IndexAndType.VM_INDEX, IndexAndType.VM_TYPE, query)
      .subscribe((data) => {
        console.log(data);
      });
  }

  submitData() {
    let data = {};
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
      data[i] = this.addForm.controls[i].value;
    }
    if (this.addForm.status === "INVALID") {
      return false;
    }
    this.exists(data);

    return true;
  }

  getUpdateData() {
    let data = {};
    for (const i in this.updateForm.controls) {
      this.updateForm.controls[i].markAsDirty();
      this.updateForm.controls[i].updateValueAndValidity();
      data[i] = this.updateForm.controls[i].value;
    }
    if (this.updateForm.status === "INVALID") {
      return false;
    }
    this.update(data);
    return true;
  }
  exists(queryData) {
    let body = {
      query: {
        match: { ip: queryData["ip"] },
      },
    };
    this.esServiceService
      .existsData(IndexAndType.VM_INDEX, body)
      .subscribe((data) => {
        console.log(data);
        if (data.count > 0) {
          this.message.error("该IP已存在");
          return false;
        } else {
          this.create(queryData);
        }
      });
  }
  update(data) {
    this.esServiceService
      .updateByIndex(
        IndexAndType.VM_INDEX,
        IndexAndType.VM_TYPE,
        this.updateData["_id"],
        data
      )
      .subscribe((data) => {
        console.log(data);
        this.getTableDatas();
      });
  }

  deleteData(data = null, contentTpl = null) {
    let that = this;
    this.modalService.create({
      nzTitle: "删除资产",
      nzContent: data != null ? "删除操作不可逆,请谨慎操作！" : contentTpl,
      nzWidth: data !== null ? 500 : 700,
      nzOnOk() {
        let ids = [];
        if (data != null) {
          ids.push(data["_id"]);
        } else {
          that.canDelData.forEach((e, i, arr) => {
            ids.push(e["_id"]);
          });
        }
        let mid = that.message.loading("正在删除中", { nzDuration: 0 })
          .messageId;
        that.esServiceService
          .deleteData(IndexAndType.VM_INDEX, IndexAndType.VM_TYPE, ids)
          .subscribe((data) => {
            console.log(data);
            that.message.remove(mid);
          });
      },
      nzOnCancel() {},
    });
  }

  create(data) {
    this.esServiceService
      .addDataByIndex(IndexAndType.VM_INDEX, IndexAndType.VM_TYPE, data)
      .subscribe((data) => {
        console.log("添加成功");
        console.log(data);
        this.getTableDatas();
      });
  }

  refreshStatus(): void {
    let allChecked = this.displayData.every((value) => value.checked === true);
    let allUnChecked = this.displayData.every((value) => !value.checked);
    this.allChecked = this.displayData.length > 0 && allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
    let checkedData = this.displayData.filter((value) => {
      let valueTmp: any = value;
      return valueTmp.checked;
    });
    this.checkedNumber = checkedData.length;
    this.canDelData = checkedData;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach((data) => (data.checked = value));
    this.refreshStatus();
  }

  ngOnInit() {
    this.getTableDatas();
  }
}
