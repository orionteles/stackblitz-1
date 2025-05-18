import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface Perfil {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css']
})
export class PerfisComponent implements OnInit {
  perfis: Perfil[] = [];
  perfilForm: FormGroup;
  modalTitle: string = '';
  editingId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPerfis();
  }

  loadPerfis() {
    // TODO: Replace with actual API call
    this.perfis = [
      { id: 1, nome: 'Administrador' },
      { id: 2, nome: 'Usuário' }
    ];
  }

  openModal(perfil?: Perfil) {
    this.modalTitle = perfil ? 'Editar Perfil' : 'Novo Perfil';
    if (perfil) {
      this.editingId = perfil.id;
      this.perfilForm.patchValue(perfil);
    } else {
      this.editingId = null;
      this.perfilForm.reset();
    }
    $('#perfilModal').modal('show');
  }

  savePerfil() {
    if (this.perfilForm.valid) {
      const perfilData = this.perfilForm.value;
      
      // TODO: Replace with actual API call
      if (this.editingId) {
        // Update existing perfil
        const index = this.perfis.findIndex(p => p.id === this.editingId);
        if (index !== -1) {
          this.perfis[index] = { ...this.perfis[index], ...perfilData };
        }
      } else {
        // Create new perfil
        const newPerfil = {
          id: this.perfis.length + 1,
          ...perfilData
        };
        this.perfis.push(newPerfil);
      }

      $('#perfilModal').modal('hide');
      Swal.fire({
        title: 'Sucesso!',
        text: 'Perfil salvo com sucesso',
        icon: 'success'
      });
    }
  }

  editPerfil(perfil: Perfil) {
    this.openModal(perfil);
  }

  deletePerfil(id: number) {
    Swal.fire({
      title: 'Confirmar exclusão',
      text: 'Deseja realmente excluir este perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Replace with actual API call
        this.perfis = this.perfis.filter(p => p.id !== id);
        
        Swal.fire({
          title: 'Sucesso!',
          text: 'Perfil excluído com sucesso',
          icon: 'success'
        });
      }
    });
  }
}