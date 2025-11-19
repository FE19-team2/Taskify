/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      // 커밋 메시지에서 '#123' 같은 걸 이슈 참조로 인식
      issuePrefixes: ['#'],
    },
  },

  rules: {
    // 1) type은 이 중 하나만 허용
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'test']],

    // 2) 타입은 반드시 있어야 함
    'type-empty': [2, 'never'],

    // 3) scope는 쓰지 않음
    'scope-empty': [2, 'always'],

    // 4) 설명(subject)은 반드시 있어야 함 → "feat: (#14)" 막힘
    'subject-empty': [2, 'never'],
    'subject-case': [0],

    // 5) 이슈 번호(#숫자)는 반드시 하나 이상 있어야 함
    'references-empty': [2, 'never'],

    // 6) 헤더 길이 제한
    'header-max-length': [2, 'always', 72],
  },
};
