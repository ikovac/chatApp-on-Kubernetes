import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-message-buttons-section',
  templateUrl: './message-buttons-section.component.html',
  styleUrls: ['./message-buttons-section.component.scss']
})
export class MessageButtonsSectionComponent implements OnInit {
  name: 'Ivo';
  animal: 'Dog';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
