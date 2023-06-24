import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})


export class ProgressBarComponent implements OnInit {
  porcentajeCarga: number = 0;

  ngOnInit() {
    // Simulación de progreso de carga
    setInterval(() => {
      this.actualizarPorcentajeCarga();
    }, 1000);
  }

  actualizarPorcentajeCarga() {
    // Aquí puedes agregar la lógica para calcular el progreso de carga real de tu página
    // Por simplicidad, incrementamos el porcentaje en cada llamada hasta llegar a 100
    if (this.porcentajeCarga < 100) {
      this.porcentajeCarga += 100;
    }
  }
}
