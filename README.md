# ArtMet - 메트로폴리탄 미술관 웹사이트

[ArtMet](https://lee-donghyun.github.io/opensource-10/main.html)

메트로폴리탄 미술관에서 제공하는 오픈 api 를 사용해서 소장 작품을 카테고리별로 보여주는 웹사이트 입니다.

## 사용 기술

- Javascript
- Html
- Css
- Tailwind CSS

## 커밋 규칙

### 브랜치

해당 레포지토리는 git flow를 사용합니다.

![이미지](./git-flow.png)

### 커밋

태그 : 제목의 형태이며, :뒤에만 space가 있음에 유의한다.

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리펙토링
- test : 테스트 코드, 리펙토링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정

## 페이지 명세

- 메인 페이지 -> 권영우
  - 작품 카테고리 선택
  - api를 사용하여 카테고리 목록을 가져오기
- 카테고리 이미지 목록 -> 이동현
  - 카테고리 별 작품 미리보기
  - api를 사용하여 작품 목록을 가져오기
  - 작품 목록을 클릭하면 상세 페이지로 이동
- 이미지 상세 -> 정해린
  - 작품 상세 정보
  - api를 사용하여 작품 상세 정보 가져오기
- 웹 사이트 정보 -> 정성윤
  - 웹 사이트 정보
  - api를 사용하여 웹 사이트 정보 가져오기
