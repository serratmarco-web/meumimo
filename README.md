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
- Cada aparelho/navegador tem seus próprios dados.
