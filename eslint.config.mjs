import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["tailwind.config.cjs"],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "prettier": eslintPluginPrettier,
      "react": eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
    },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
    // var 사용 금지 (let, const 사용 권장)
    "no-var": "warn",
    // 여러 줄의 빈 줄 금지
    "no-multiple-empty-lines": "warn",
    "eqeqeq": "warn",
    // 객체 속성 접근 시 대괄호([]) 대신 점(.) 표기법 권장
    "dot-notation": "warn",
    // 선언해놓고 사용하지 않는 변수엔 경고
    "no-unused-vars": "warn",
    // 자식 요소가 없는 React 컴포넌트는 self-closing 태그 사용 권장
    // cf. self-closing이란? <div></div> 말고, <div /> 와 같은 형태를 의미함.
    "react/self-closing-comp": "warn",
    // 배열 렌더링 시 key prop 필수 사용
    "react/jsx-key": "warn",
    // React 컴포넌트 이름은 PascalCase 사용
    "react/jsx-pascal-case": "warn",
    // JSX에서 불필요한 중괄호는 사용 금지
    "react/jsx-curly-brace-presence": "warn",
    // 불필요한 Fragment 사용 금지
    "react/jsx-no-useless-fragment": "warn",
    // props와 state는 구조 분해 할당 사용 권장
    "react/destructuring-assignment": "warn",
    // 사용하지 않는 state 경고 -> 불필요한 리렌더링 방지
    "react/no-unused-state": "warn",
    // 단방향 흐름을 유지하기 위해 state 직접 수정 금지 (setState 사용 권장)
    "react/no-direct-mutation-state": "warn",
    // Prettier 포맷팅 규칙
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto" // 각자 OS에 맞는 줄바꿈 문자 사용
      }
    ],
  },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
