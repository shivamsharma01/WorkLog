import { Pipe, PipeTransform } from "@angular/core";
import { AppService } from "src/app/app.service";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  constructor(private service: AppService) {}
  transform(value: number): string {
    return this.service.getFormatedTime(value, false) || "0 Min.";
  }
}
