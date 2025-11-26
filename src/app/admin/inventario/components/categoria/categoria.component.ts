import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { title } from 'process';
import { error } from 'console';



interface Categoria{
  id: number,
  nombre: string;
  detalle: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  private cd = inject(ChangeDetectorRef)
  private categoriaService = inject(CategoriaService)
  
  categorias: Categoria[]=[]
  dialog_visible: boolean=false
  categoria_id:number=-1;
  categoriaForm = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  })
  
  ngOnInit():void{
    this.getCategorias()
  }

  getCategorias(){
    this.categoriaService.funListar().subscribe(
      (res:any)=>{
        this.categorias=[...res];
        this.cd.detectChanges();
      },
      (error:any)=>{
        console.log(error);
      }
    )

  }

  mostrarDialog(){
    this.dialog_visible=true
  }
   
 guardarCategoria() {
  if (this.categoria_id > 0) {
    this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value)
      .subscribe(res => {
        this.dialog_visible = false;
        this.getCategorias();
        this.categoria_id = -1;
        this.cd.detectChanges();
        this.alerta("actualizado!!","El registro se modifico con exito!!","success")
      },(error:any)=>{
        this.alerta("error al actualizar","verifica los datos!!","error")
      }
    );
    this.categoriaForm.reset();
  } else {
    this.categoriaService.funGuardar(this.categoriaForm.value)
      .subscribe(res => {
        this.dialog_visible = false;
        this.getCategorias();
        this.cd.detectChanges();
        this.alerta("Registrado!!","La categoria se creo con exito!!","success")
      }),
      (error:any)=>{
        this.alerta("error al registrar!!","verifica los datos!!!","error")
      }
       this.categoriaForm.reset();;
  }
}

  editarCategoria(cat:Categoria){
    this.dialog_visible=true
    this.categoria_id=cat.id
    this.categoriaForm.setValue({nombre: cat.nombre, detalle: cat.detalle})

  }
  eliminarCategoria(cat:Categoria){

    Swal.fire({
      title:"Estas seguro de borrar el registro?",
      text: "No se podra recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText:"Si, eliminar!"
    }).then((result)=>{

      if(result.isConfirmed){
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res:any)=>{
          this.alerta("Eliminado!!","Registro Eliminado","success")
          this.getCategorias();
          this.categoria_id=-1
          },
          (error:any)=>{
          this.alerta("error!!!","Error al intentar eliminar registro","error")
          }
        )
      }
      }
    )

  }
  alerta(title:string, text:string, icon:'success'|'error'|'info'|'question'){
    Swal.fire({title,text,icon})
  }
}
