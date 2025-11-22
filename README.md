# SkillPlus2030
### Acesse SkillPlus2030 GS.pdf para mais informações

Aplicativo mobile desenvolvido em React Native para desenvolvimento de competências essenciais para o futuro do trabalho.

## Sobre o App

O **SkillPlus2030** é uma plataforma de aprendizado que ajuda profissionais a desenvolverem habilidades fundamentais através de trilhas de conhecimento personalizadas. O app utiliza um sistema de autoavaliação para identificar áreas de melhoria e recomendar trilhas de aprendizado adequadas.

## Funcionalidades Principais

- **Autoavaliação de Competências**: Avalie seu nível atual em diferentes habilidades (Comunicação, Pensamento Crítico, IA Básica, Sustentabilidade, Trabalho em Equipe, Gestão do Tempo)
- **Trilhas de Aprendizado**: Acesse trilhas estruturadas com conteúdos em vídeo, texto e quizzes
- **Recomendações Personalizadas**: Receba sugestões de trilhas baseadas nas suas autoavaliações
- **Acompanhamento de Progresso**: Monitore seu desenvolvimento e conquistas
- **Sistema de Gamificação**: Ganhe pontos e badges ao completar atividades


## Como Executar

### Pré-requisitos

- Node.js >= 20
- React Native CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

```bash
# Instalar dependências
npm install

# Para iOS, instalar pods
cd ios && pod install && cd ..
```

### Executar

```bash
# Iniciar Metro Bundler
npm start

# Executar no Android (em um terminal separado)
npm run android

# Executar no iOS (em um terminal separado)
npm run ios
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── navigation/          # Configuração de navegação
├── screens/            # Telas da aplicação
│   ├── Auth/          # Login e Registro
│   └── Home/          # Trilhas, Autoavaliação, Progresso
├── theme/              # Estilos e temas
└── utils/              # Funções utilitárias e lógica de negócio
```

## Solução Proposta

O **SkillPlus2030** foi desenvolvido para abordar o desafio de capacitação profissional através de uma solução mobile completa e personalizada. A aplicação implementa uma arquitetura modular e escalável que combina conceitos de orientação a objetos, separação de responsabilidades e organização estrutural.

### Arquitetura e Organização

A solução adota uma arquitetura em camadas com separação clara de responsabilidades:

- **Camada de Apresentação (`screens/`)**: Componentes funcionais React que representam as telas da aplicação, utilizando hooks para gerenciamento de estado local
- **Camada de Componentes (`components/`)**: Componentes reutilizáveis como `TrailCard`, seguindo o princípio DRY (Don't Repeat Yourself)
- **Camada de Navegação (`navigation/`)**: Configuração centralizada usando React Navigation com tipagem TypeScript para type-safety
- **Camada de Utilitários (`utils/`)**: Lógica de negócio e serviços de persistência de dados
- **Camada de Estilização (`theme/`)**: Sistema de design unificado com constantes de cores, espaçamento e tipografia

### Implementação da Solução

#### 1. Sistema de Autoavaliação e Recomendações

O módulo de recomendações (`utils/recommendations.ts`) implementa um algoritmo inteligente que:

- **Interface `Trail`**: Define a estrutura de dados de uma trilha de aprendizado com propriedades tipadas (id, title, description, duration, level, category, skills, lessons)
- **Interface `Lesson`**: Especifica os tipos de conteúdo (video, text, quiz) com duração e status de conclusão
- **Função `getRecommendedTrails()`**: Analisa as autoavaliações do usuário, identifica competências com notas abaixo de 7 e retorna trilhas que desenvolvem essas habilidades, ordenadas por relevância

#### 2. Persistência de Dados com AsyncStorage

O módulo `storage.ts` implementa um serviço de persistência seguindo padrões de encapsulamento:

- **Interfaces TypeScript**: `Profile`, `Assessment`, `TrailProgress`, `UserProgress` - definem contratos claros para os dados
- **Funções especializadas**: Cada função tem responsabilidade única (saveAssessment, getAssessments, saveTrailProgress, etc.)
- **Abstração de armazenamento**: O AsyncStorage é encapsulado, permitindo futura migração para banco de dados sem impactar o restante da aplicação

#### 3. Sistema de Gamificação

Implementação de um sistema de pontos e badges que:

- **Função `addPoints()`**: Adiciona pontos de forma incremental e persistente
- **Função `checkBadges()`**: Verifica condições para desbloqueio de badges (Primeiros Passos, Trilha Completa, Avaliador, Especialista)
- **Função `getUserProgress()`**: Agrega dados de múltiplas fontes para gerar um resumo completo do progresso do usuário

#### 4. Navegação Hierárquica

A navegação utiliza múltiplos níveis de stack:

- **RootStack**: Gerencia autenticação vs. aplicação principal
- **AuthStack**: Fluxo de login e registro
- **DrawerNavigator**: Menu lateral para acesso a perfil e configurações
- **TabNavigator**: Navegação por abas na área principal (Trilhas, Autoavaliação, Progresso)

#### 5. Componentes Reutilizáveis

O componente `TrailCard` demonstra:

- **Props tipadas**: Interface `Props` define o contrato do componente
- **Composição**: Utiliza componentes nativos do React Native de forma combinada
- **Reutilização**: Pode ser usado em diferentes contextos (trilhas recomendadas, todas as trilhas, trilhas por categoria)

### Conceitos de Orientação a Objetos Aplicados

Embora React utilize programação funcional, a solução incorpora princípios O.O.:

1. **Encapsulamento**: Dados e funções relacionadas são agrupadas em módulos (`storage.ts`, `recommendations.ts`)
2. **Abstração**: Interfaces TypeScript definem contratos sem expor implementação
3. **Separação de Responsabilidades**: Cada módulo tem uma função específica e bem definida
4. **Reutilização**: Componentes e funções utilitárias são projetados para serem reutilizáveis
5. **Type Safety**: TypeScript garante consistência de tipos em toda a aplicação

### Organização de Diretórios

A estrutura de diretórios segue o padrão de organização por funcionalidade:

- **Separação por contexto**: `Auth/` e `Home/` agrupam telas relacionadas
- **Componentes compartilhados**: `components/` contém elementos reutilizáveis
- **Configuração centralizada**: `navigation/` e `theme/` centralizam configurações
- **Lógica de negócio isolada**: `utils/` separa regras de negócio da apresentação

Esta organização facilita manutenção, escalabilidade e colaboração em equipe.

## Resultados Esperados e Impacto

### Resultados Esperados

Com a implementação do **SkillPlus2030**, espera-se alcançar os seguintes resultados:

1. **Aumento da Autoconsciência Profissional**
   - Usuários terão maior clareza sobre suas competências atuais através do sistema de autoavaliação
   - Identificação precisa de gaps de conhecimento e áreas de melhoria

2. **Desenvolvimento Personalizado de Competências**
   - Recomendações inteligentes direcionam o aprendizado para áreas prioritárias
   - Redução do tempo necessário para identificar conteúdos relevantes

3. **Engajamento Sustentado**
   - Sistema de gamificação (pontos e badges) mantém motivação ao longo do tempo
   - Progresso visual e conquistas incentivam continuidade no aprendizado

4. **Acesso Democratizado ao Aprendizado**
   - Plataforma mobile permite aprendizado em qualquer lugar e momento
   - Conteúdos estruturados em trilhas facilitam o aprendizado progressivo

5. **Mensuração de Progresso**
   - Dashboard de progresso fornece métricas claras de desenvolvimento
   - Histórico de autoavaliações permite acompanhar evolução ao longo do tempo

### Impacto Positivo Almejado

#### Impacto Individual

- **Desenvolvimento Profissional Contínuo**: Profissionais terão acesso a uma ferramenta que facilita o aprendizado contínuo e o desenvolvimento de competências essenciais para 2030
- **Preparação para o Futuro do Trabalho**: Foco em competências como IA, sustentabilidade e soft skills prepara usuários para as demandas do mercado futuro
- **Autonomia no Aprendizado**: Sistema de recomendações personalizadas permite aprendizado autodirigido e eficiente

#### Impacto Organizacional

- **Capacitação de Equipes**: Organizações podem utilizar a plataforma para capacitar equipes de forma escalável
- **Redução de Custos de Treinamento**: Solução mobile reduz necessidade de treinamentos presenciais e infraestrutura física
- **Mensuração de Desenvolvimento**: Métricas de progresso permitem acompanhamento do desenvolvimento de competências em nível organizacional

#### Impacto Social

- **Democratização da Educação**: Acesso facilitado a conteúdos de qualidade através de dispositivo mobile
- **Preparação para Transformação Digital**: Contribuição para preparação da força de trabalho para mudanças tecnológicas
- **Sustentabilidade**: Promoção de competências relacionadas à sustentabilidade no ambiente profissional

### Métricas de Sucesso

A solução será considerada bem-sucedida quando:

- Usuários completarem pelo menos 2 trilhas nos primeiros 3 meses
- Taxa de retenção mensal superior a 60%
- Média de autoavaliações por usuário superior a 4
- 80% dos usuários desbloquearem pelo menos 1 badge
- Melhoria média de 1.5 pontos nas autoavaliações após 6 meses de uso

O **SkillPlus2030** representa uma solução completa e inovadora para o desafio de capacitação profissional, combinando tecnologia moderna, design centrado no usuário e uma abordagem baseada em dados para personalização do aprendizado.
