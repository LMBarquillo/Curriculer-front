import swal from 'sweetalert2';

export class Swal {
  public static buildSwal(title: string, body: string, type: any, btnConfirm?: string, btnCancel?: string): any {
    return swal.fire({
      title: title,
      type: type,
      html: body,
      customClass: 's-font-size',
      showCancelButton: true,
      cancelButtonText: btnCancel ? btnCancel : 'Cancelar',
      confirmButtonText: btnConfirm ? btnConfirm :'Aceptar'
    });
  }

  public static buildSwallWithoutButtons(title: string, body: string, type: any): any {
    return swal.fire({
      title: title,
      type: type,
      html: body,
      customClass: 's-font-size',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false
    });
  }

  public static buildSwalWithoutCancel(title: string, body: string, type: any): any {
    return swal.fire({
      title: title,
      type: type,
      html: body,
      customClass: 's-font-size',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    });
  }
}
