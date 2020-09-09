import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.css"],
})
export class ReportListComponent implements OnInit {
  current = 1;
  pageSize = 10;
  totalCount = 1;
  dataSet = [
    {
      _source: {
        id: "1",
        name: "报表1",
        type: "win",
        createdTime: "2020-09-07T07:01:08.058Z",
      },
    },
  ];
  constructor() {}

  ngOnInit() {}
}
