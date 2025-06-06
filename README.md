# 2025 OSSCA NEXT.JS 블로그

[2025년 오픈소스 컨트리뷰션 아카데미 체험형 1차 [Git 활용 및 Next.js 뽀개기] 과정](https://www.contribution.ac/19936dcb-0b5f-806e-a556-cb984d06e452)에서 진행한 프로젝트로, <br> 프로그램 참여자들의 TIL을 모아볼 수 있는 블로그 입니다.

## 팀원소개

| <img src="https://avatars.githubusercontent.com/u/57708995?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/202383248?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/115773895?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/48996701?v=4" width="100"/> | <img src="https://avatars.githubusercontent.com/u/130109502?v=4" width="100"/> |
| :---------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|         [**김수연**](https://github.com/syk001108) <br> 포스팅 페이지         |      [**김은빈**](https://github.com/ASI-031) <br> 디자인, 제작자 페이지       |            [**이한빈**](https://github.com/Clt689) <br> 검색 페이지            |       [**조준희**](https://github.com/aiminghee3) <br> Feedback 페이지        |       [**전예진**](https://github.com/dpwls02142) <br> 헤더, 메인페이지        |

## 시작 가이드

```bash
# node.js v 20 이상
# 프로젝트에 필요한 패키지 설치
npm install
# 개발 서버 실행 (localhost:3000)
npm run dev
# 프로덕션 빌드 생성
npm run build
# 빌드된 앱 실행
npm run start
```

## 기술 스택

### Framework & Language

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

### Styling

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### CI/CD & Deployment

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### Code Quality & Tools

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-272727?style=for-the-badge&logo=git&logoColor=white)
![CodeRabbit](https://img.shields.io/badge/CodeRabbit-FF3C7E?style=for-the-badge&logo=github&logoColor=white)

### Collaboration & Design

![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## 아키텍쳐

### 디렉토리 구조

```
/src
├── app/
│   │
│   ├── common/
│   │   ├── Devider.tsx
│   │   ├── AppDropdownButton.tsx
│   │   ├── AppHeader.tsx
│   │   ├── AppHeaderBottomBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortArticle.tsx
│   │   └── TabMenu.tsx
│
│   ├── posting/
│   │   ├── components/
│   │   │   └── ArticleSnippet.tsx
│   │   ├── PostingTemplate.tsx
│   │   └── page.tsx
│
│   ├── qna/
│   │   ├── components/
│   │   │   └── QnaPreviewCard.tsx
│   │   ├── QnaTemplate.tsx
│   │   └── page.tsx
│
│   ├── search/[type]
│   │   ├── SearchResultTemplate.tsx
│   │   └── page.tsx
│
│   ├── developers/
│   │   ├── components/
│   │   │   └── DevelopersIntroCard.tsx
│   │   ├── DevelopersTemplate.tsx
│   │   └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── MainContent.tsx
│
├── mainFrames/
│   ├── Frame1.tsx
│   ├── Frame2.tsx
│   ├── Frame3.tsx
│   ├── Frame4.tsx

```
