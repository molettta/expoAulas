// types.ts
export type StatusSync = "rascunho" | "na_fila" | "sincronizado" | "erro";

export type Vistoria = {
  idLocal: string;
  equipamento: string;
  observacao?: string;
  status: StatusSync;
};

export function textoDoStatus(status: StatusSync): string {
  switch (status) {
    case "rascunho":     return "Rascunho - nao enviado";
    case "na_fila":      return "Salvo no aparelho";
    case "sincronizado": return "Enviado";
    case "erro":         return "Falha ao enviar";
  }
}
