// NovaVistoriaScreen.tsx - o formulario. Aqui o useState finalmente serve.
import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from "react-native";
import type { Vistoria } from "./types";
import { claro, escuro, toque } from "./tema";
import { carregar, salvar } from "./armazenamento";
import type { RootStackParamList } from "./App";

type Props = NativeStackScreenProps<RootStackParamList, "NovaVistoria">;

export default function NovaVistoriaScreen({ navigation }: Props) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  const [equipamento, setEquipamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [salvando, setSalvando] = useState(false);

  const podeSalvar = equipamento.trim().length > 0 && !salvando;

  async function gravar() {
    setSalvando(true);
    const nova: Vistoria = {
      idLocal: String(Date.now()),
      equipamento: equipamento.trim(),
      observacao: observacao.trim() || undefined,
      status: "na_fila",
    };
    const atuais = await carregar();
    await salvar([nova, ...atuais]);
    navigation.goBack();
  }

  return (
    <View style={[styles.tela, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.rotulo, { color: cores.texto }]}>Equipamento *</Text>
      <TextInput
        value={equipamento}
        onChangeText={setEquipamento}
        placeholder="Ex.: Bomba 03"
        placeholderTextColor={cores.textoFraco}
        style={[styles.campo, { color: cores.texto, borderColor: cores.textoFraco }]}
        accessibilityLabel="Equipamento"
      />

      <Text style={[styles.rotulo, { color: cores.texto }]}>Observacao</Text>
      <TextInput
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Opcional"
        placeholderTextColor={cores.textoFraco}
        multiline
        style={[styles.campo, styles.campoAlto,
                { color: cores.texto, borderColor: cores.textoFraco }]}
        accessibilityLabel="Observacao"
      />

      <Pressable
        onPress={gravar}
        disabled={!podeSalvar}
        style={[styles.botao, { minHeight: toque.minimo,
                backgroundColor: podeSalvar ? cores.estado.sincronizado : cores.estado.rascunho }]}
        accessibilityRole="button"
        accessibilityLabel="Salvar vistoria no aparelho"
      >
        <Text style={styles.botaoTexto}>
          {salvando ? "Salvando..." : "Salvar no aparelho"}
        </Text>
      </Pressable>

      <Text style={[styles.aviso, { color: cores.textoFraco }]}>
        O registro fica salvo no aparelho mesmo sem sinal. O envio ao servidor
        e outra etapa.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela:   { flex: 1, padding: 16, gap: 8 },
  rotulo: { fontSize: 14, fontWeight: "600", marginTop: 8 },
  campo:  { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  campoAlto: { minHeight: 88, textAlignVertical: "top" },
  botao:  { marginTop: 16, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  botaoTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  aviso:  { fontSize: 13, marginTop: 8 },
});
