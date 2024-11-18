import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DashBoard = () => {
  return (
    <Box>
      <LayoutBaseDePagina
        titulo="Página Inicial"
        barrasDeFerramentas={<FerramentasDeDetalhe 
          mostrarBotaoSalvarEFechar
        />}
      >
        <></>
      </LayoutBaseDePagina>
    </Box>
  );
};
