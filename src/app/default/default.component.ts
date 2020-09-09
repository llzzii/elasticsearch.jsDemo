import { Component, ElementRef, OnInit } from "@angular/core";

import * as asideData from "../../assets/data/nav-aside.json";
@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.css"],
})
export class DefaultComponent implements OnInit {
  datas = asideData["default"];
  mainHeight;
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.mainHeight = this.getMainHeight();
  }

  ngDoCheck(): void {
    this.mainHeight = this.getMainHeight();
  }

  getMainHeight(): number {
    const pageMain = this.elementRef.nativeElement.querySelector("#page-main");
    const winH = window.innerHeight,
      mainOffset = pageMain.offsetTop;
    let mainH = winH - (mainOffset || 0);
    mainH = mainH <= 0 ? 1 : mainH;
    return mainH;
  }
  ngOnInit() {
    console.log(this.datas);
  }
}
