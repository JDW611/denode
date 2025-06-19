# Denode 채용 과제 (정다운)

## 개요

재고 관리 시스템 API 개발

## 기술 스택

| Name       | Version |
| ---------- | ------- |
| NestJS     | ^10.0.0 |
| TypeScript | ^5.1.3  |
| TypeORM    | 0.3.20  |
| MySQL      | 8.0     |

## 2. 설치 및 실행 방법

### 설치

```bash
$ git clone https://github.com/JDW611/denode-JeongDaWoon.git
$ cd denode-JeongDaWoon

# install
$ yarn

```

### 환경변수 설정

프로젝트 내에 존재하는 `.env`를 사용합니다.

```.env
# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=testuser
DB_PASSWORD=ekdns001
DB_DATABASE=denode
DB_SYNCHRONIZE=true

# Application
PORT=3000

# JWT
JWT_SECRET=test
JWT_ISSUER=denode
JWT_EXPIRES_IN=1h
JWT_REFRESH_TOKEN_EXPIRED=2

```

### 실행

```bash
$ yarn docker:dev

# 또는 Docker Compose 직접 사용
$ docker compose up --build
```

## 3. API 명세

-   swagger 문서

    > http://localhost:3000/api-docs

## 4. 테스트 시나리오

1. **계정 생성**

    - 회원가입으로 새 계정 생성 및 accessToken 획득
    - 또는 로그인하여 accessToken 획득

2. **제품 등록**

    - 발급된 accessToken 활용하여 제품 등록

3. **재고 입/출고**

    - 재고 입/출고 테스트

4. **현황 확인**
    - 재고 조회 및 재고 이력 조회 테스트 진행
