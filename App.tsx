// App.tsx
import { StyleSheet, Text, View } from "react-native";
import { ItemLista } from "./ItemLista";
import type { Vistoria } from "./types";

const REGISTROS: Vistoria[] = [
  { idLocal: "1", equipamento: "Bomba 03",     status: "sincronizado" },
  { idLocal: "2", equipamento: "Painel A2",    status: "na_fila" },
  { idLocal: "3", equipamento: "Compressor 1", status: "erro" },
];

export default function App() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Operacao Campo</Text>
      <Text style={styles.variante}>Variante B - Campo</Text>

      {REGISTROS.map((r) => (
        <ItemLista key={r.idLocal} item={r} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tela:     { flex: 1, paddingTop: 60, paddingHorizontal: 16,
              backgroundColor: "#fff" },
  titulo:   { fontSize: 22, fontWeight: "bold" },
  variante: { fontSize: 14, color: "#666", marginBottom: 16 },
});
