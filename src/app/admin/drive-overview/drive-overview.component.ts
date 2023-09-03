import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/shared/services/drive.service';
import { Router, RouterLink } from '@angular/router';
import { Article } from 'src/app/modeles/interfaces.type';
import { Subscription } from 'rxjs';
import { NgClass, NgIf, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-drive-overview',
    templateUrl: './drive-overview.component.html',
    styleUrls: ['./drive-overview.component.css'],
    standalone: true,
    imports: [MatTableModule, RouterLink, NgClass, NgIf, MatProgressBarModule, DatePipe]
})
export class DriveOverviewComponent implements OnInit {
  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;

  allDriveFiles;
  articles: Article[] = [];
  displayedColumns: string[] = ['name', 'modifiedTime', 'articleDateModified'];
  subDriveService: Subscription;

  constructor(private driveService: DriveService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFiles();
  }

  getAllFiles() {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.subDriveService = this.driveService.getAllFilesFromDrive().subscribe(
      data => {
        if(data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
        this.allDriveFiles = data;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }

  ngOnDestroy() {
    this.subDriveService.unsubscribe();
  }
}
