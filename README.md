# MeuMimo Pet 🐾
PWA simples para as marcações do seu pet (banho, tosa, vacina, vermífugo, consultas). Sem servidor: os dados ficam no aparelho (localStorage). Funciona offline depois da primeira abertura.

## Publicar no GitHub Pages
1. Crie um repositório (ex.: `meupet`) e suba **todos** os arquivos desta pasta na raiz.
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`, **Save**.
3. Em ~1 minuto o app abre em `https://SEU-USUARIO.github.io/meupet/`.
4. No celular: abra o link → **Instalar app** (Android/Chrome) ou **Compartilhar → Adicionar à Tela de Início** (iPhone/Safari).

Todos os caminhos são relativos, então funciona em subpasta do github.io.

## Atualizando
Ao mudar arquivos, aumente a versão em `sw.js` (`const V = 'meupet-v2'`) para o app instalado pegar a novidade.

## Dados
- Clubinho: toque no card 👑 para informar plano, mensalidade, usos por mês e data da assinatura; marque cada mensalidade como paga.
- Perfil → **Exportar backup** gera um `.json`; **Importar** restaura em outro aparelho.
- Carteirinha de vacinação (por pet): vacina, aplicação, próximo reforço, clínica, lote e anexos. Avisa reforço atrasado ou nos próximos 30 dias, e entra no backup.
- Anexos (fotos e PDFs, até 10 MB cada): no perfil do pet ou em uma marcação. Ficam no aparelho (IndexedDB), não vão para o GitHub.
- O backup `.json` inclui os anexos. Importar um backup com anexos substitui os atuais; um backup antigo, sem anexos, mantém os atuais.
- Excluir uma marcação mantém os anexos no perfil do pet. Remover o pet apaga os anexos dele.
- Limpar os dados do site apaga tudo. Faça backup de vez em quando.
- Lembrete de backup: aparece se nunca exportou ou após 30 dias. **Depois** adia por 7 dias.
- Importar um backup pede confirmação e recusa arquivos com identificadores ou datas inválidos.
- Ao excluir uma marcação, há 7 segundos para **Desfazer**.
- Na primeira abertura do dia em que houver pendência, um alerta mostra marcações (atrasadas, hoje e amanhã), reforços (atrasados e em até 30 dias) e mensalidades do mês atual e anterior (atrasadas ou a vencer em até 3 dias).
- Cada aparelho/navegador tem seus próprios dados.
