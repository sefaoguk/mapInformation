import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Tile from 'ol/Layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import { toStringHDMS, toStringXY } from 'ol/coordinate';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { Connection } from 'postgresql-client';
//import { Pool } from 'postgresql-client';

import { decimalDigest } from '@angular/compiler/src/i18n/digest';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  container;
  closer;
  map;
  overlays;
  x;
  y;
  returns;
  hdms;
exform:FormGroup;
  constructor() 
  {
    
  }
  ngOnInit(): void 
  {

  this.exform = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    telephone: new FormControl(null, Validators.required),
    type: new FormControl(null),
    hdms1: new FormControl(null),
    hdms2: new FormControl(null)
  })
  

    this.InitalizeMap();
  }
  InitalizeMap() {
    this.map = new Map({
      layers: [
        new Tile({
          source: new OSM(),
        })
      ],
      target: 'map',
      view: new View({
        center: ([37.41, 8.82]),
        zoom: 4,
      })
    })
  }
  openPopup(event) {
    this.closer = true;
    this.map.on('singleclick', function (e) {
      this.hdms = (toLonLat(e.coordinate));
      
     
    })
    this.overlays = new Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    this.x = event.clientX - 48.7;

    this.exform.patchValue(
      {
       hdms1:this.map.hdms[0],
       hdms2:this.map.hdms[1],
      }
      
    )

    console.log(this.exform)

    // switch (this.x, this.y) {
    //   case (event.clientY< 280):{ this.y = event.clientY; break;}
    //   case (event.clientY > 280):{ this.y = event.clientY - 272; break;}
    //   case (event.clientX < 20): {this.x = event.clientX; break;}
    //   case (event.clientX > 1400): {this.x = event.clientX - 330; break;}
    // }

    if (event.clientY < 280) {
      this.y = event.clientY;
    }
    else {
      this.y = event.clientY - 272;
    }
    if (event.clientX < 20) {
      this.x = event.clientX;
    }
    if (event.clientX > 1400) {
      this.x = event.clientX - 330
    }
  }
  closePopup() {
    return this.closer = false;
  };
  submitDatabase() {
    console.log(this.exform.value)
    //this.exform.setValue(this.hdms1)
  }
  dataBase() {
    //const connection = new Connection('postgres://localhost');

    //   const result = await connection.query(
    //       'select * from cities where name like $1',
    //       {values: ['%york%']});
    //   const rows = result.rows;
    //   await connection.close(); // Disconnect
    //   const db = new Pool({
    //     host: 'postgres://localhost',
    //     pool: {
    //       min: 1,
    //       max: 10,
    //       idleTimeoutMillis: 5000
    //     }
    //   });
    //   const result = await db.query(
    //     'select * from cities where name like $1',
    //     { values: ['%york%'], cursor: true });
    //   const cursor = result.cursor;
    //   let row;
    //   while ((row = cursor.next())) {
    //     console.log(row);
    //   }
    //   await db.close(); // Disconnect all connections and shutdown pool
    // }

  }
}





