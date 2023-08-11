# HABL 2.0
<<<<<<< HEAD

## 개발 관련 설정
1. [Android Gradle Nexus 접속 설정](https://172.40.0.211:81/hiblocks/habl/hiblocks-habl-app/-/wikis/Android-Gradle-Nexus-%EC%A0%91%EC%86%8D-%EC%84%A4%EC%A0%95)
2. [NVM 설정](https://172.40.0.211:81/hiblocks/habl/hiblocks-habl-app/-/wikis/NVM-%EC%82%AC%EC%9A%A9-%EC%84%A4%EC%A0%95)

## 폴더 설명
- `__test__/`: 테스트 파일들을 저장하는 폴더
- `android/`: Android 네이티브 앱에 대한 설정 파일들이 위치하는 폴더
- `ios/`: iOS 네이티브 앱에 대한 설정 파일들이 위치하는 폴더
- `node_modules/`: 프로젝트가 의존하는 패키지들이 저장되는 폴더
- `src/`: 소스 코드가 위치하는 폴더
- `components/`: 재사용 가능한 컴포넌트들을 저장하는 폴더. React Native에서 사용되는 UI 컴포넌트들이 여기에 위치
- `screens/`: 앱의 화면(Screen)을 구성하는 컴포넌트들을 저장하는 폴더. 주로 앱의 각 화면을 담당하는 컴포넌트들이 위치
- `constants/`: 상수 값을 정의하는 파일들을 저장하는 폴더
- `service/`: 서비스 로직을 담당하는 파일들을 저장하는 폴더
- `models/`: 데이터 모델을 정의하는 파일들을 저장하는 폴더
- `navigation/`: 네비게이션 관련 파일들을 저장하는 폴더. React Navigation 또는 다른 네비게이션 라이브러리를 사용할 경우, 해당 라이브러리와 관련된 파일들이 여기에 위치
- `utils/`: 유틸리티 함수, 헬퍼 함수 등을 저장하는 폴더. 앱 전반에서 사용되는 도구 함수들이 여기에 위치
- `state/`: Recoil과 같은 상태 관리 라이브러리를 사용하여 전역 상태를 관리하는 파일들을 저장하는 폴더. Recoil에서 사용하는 Atom과 Selector들이 이 폴더에 위치.
- `stores/`: MobX 스토어 파일들을 저장하는 폴더. MobX 스토어는 앱의 상태를 관리하는 역할을 수행하며 스토어 파일들이 이 폴더에 위치하여 앱의 상태 관리를 담당
- `package.json`: 프로젝트의 설정 파일로 의존성 관리, 스크립트 실행 등을 정의
- `App.js`: 앱의 진입점 컴포넌트이며, 주로 네비게이션 스택을 설정하고, 전역 상태를 Recoil Provider로 감싸는 역할을 수행
=======

## 1. SPEC

- State관리 : Recoil
- Style: Stylesheet, Inline style, ~~Styled component~~
- API: React Query
- node: 18, npm: 9

## 2. 개발 사전 설정

<details>
<summary>
열기
</summary>

### Android Gradle Nexus 접속 설정

`~/.gradle/gradle.properties`
- build.gradle, settings.gradle에서 사용
```
nexusUsername={넥서스 계정 ID}
nexusPassword={넥서스 계정 비밀번호}
nexusRepoUrl={넥서스 url}/repository/gradle-api-group/
nexusRepoBaseUrl={넥서스 url}/repository/
nexusGradlePluginRepoUrl={넥서스 url}/repository/gradle-plugins-proxy/
```
- gradle-wrapper.properties에서 사용
```
systemProp.gradle.wrapperUser={넥서스 계정 ID}
systemProp.gradle.wrapperPassword={넥서스 계정 비밀번호}
```

`~/.zshrc`

```shell
# gradle-plugin에서 nexus 접근할 때 쓰는 정보 
...
export NEXUS_USERNAME={넥서스 계정 ID}
export NEXUS_PASSWORD={넥서스 계정 비밀번호}
export NEXUS_REPOSITORY_URL={넥서스 url}/repository/

# 툴이 접근하는 기본 gradle repo 주소
export GRADLE_LIBS_REPO_OVERRIDE=https://dl.google.com/dl/android/maven2/
...
```

### NVM 설정


`~/.zshrc`

```shell
# NVM 홈 설정
export NVM_DIR=$HOME/.nvm
source $(brew --prefix nvm)/nvm.sh

# 터미널 실행 시 .nvmrc 파일 확인하여 버전 자동지정
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

### Git 파일명 대소문자 처리

```shell
git config core.ignorecase false
```

</details>

## 3. 폴더 설명

- `__test__/`: 테스트 파일들을 저장하는 폴더
- `android/`: Android 네이티브 앱에 대한 설정 파일들이 위치하는 폴더
- `ios/`: iOS 네이티브 앱에 대한 설정 파일들이 위치하는 폴더
- `node_modules/`: 프로젝트가 의존하는 패키지들이 저장되는 폴더
- `src/`: 소스 코드가 위치하는 폴더
- `components/`: 재사용 가능한 컴포넌트들을 저장하는 폴더. React Native에서 사용되는 UI 컴포넌트들이 여기에 위치
- `screens/`: 앱의 화면(Screen)을 구성하는 컴포넌트들을 저장하는 폴더. 주로 앱의 각 화면을 담당하는 컴포넌트들이 위치
- `constants/`: 상수 값을 정의하는 파일들을 저장하는 폴더
- `service/`: 서비스 로직을 담당하는 파일들을 저장하는 폴더
- `models/`: 데이터 모델을 정의하는 파일들을 저장하는 폴더
- `navigation/`: 네비게이션 관련 파일들을 저장하는 폴더. React Navigation 또는 다른 네비게이션 라이브러리를 사용할 경우, 해당 라이브러리와 관련된 파일들이 여기에 위치
- `utils/`: 유틸리티 함수, 헬퍼 함수 등을 저장하는 폴더. 앱 전반에서 사용되는 도구 함수들이 여기에 위치
- `state/`: Recoil과 같은 상태 관리 라이브러리를 사용하여 전역 상태를 관리하는 파일들을 저장하는 폴더. Recoil에서 사용하는 Atom과 Selector들이 이 폴더에 위치.
- `stores/`: MobX 스토어 파일들을 저장하는 폴더. MobX 스토어는 앱의 상태를 관리하는 역할을 수행하며 스토어 파일들이 이 폴더에 위치하여 앱의 상태 관리를 담당
- `package.json`: 프로젝트의 설정 파일로 의존성 관리, 스크립트 실행 등을 정의
- `App.js`: 앱의 진입점 컴포넌트이며, 주로 네비게이션 스택을 설정하고, 전역 상태를 Recoil Provider로 감싸는 역할을 수행

## 4. 컴포넌트 작성 규칙

1. 컴포넌트는 `function` 으로 구현
2. 컴포넌트 안 함수는 화살표 함수로 구현 : `() => void`
3. 각 화면 작업 시 `components/` 폴더의 공통 컴포넌트에 있는 항목 위주로 사용, 그 외 만들어야 할 것은 이동우,장태진 에게 확인
4. `components/` 폴더의 공통 컴포넌트 수정 시 **이동우**,**장태진** 에게 확인
5. 컴포넌트의 최상단은 `<Body/>` 컴포넌트 사용

## 5. 소스 참고

### 다크모드 확인

```js
import { useColorScheme } from "react-native";

const isDarkMode = useColorScheme() === "dark";
```

### 로그인 유저 정보

```js
const [loginedUserInfo, setLoginedUserInfo] = useRecoilState(loginedUserInfoState)
```

```
get value : loginedUserInfo.userId
set value : setLoginedUserInfo({ ...loginedUserInfo, userEmil, userId })
```

### 약관동의

```tsx
import AgreementModal from "@screen/Agreement";

const [isTerms, setIsTerms] = useState(false);
<AgreementModal isTerms={isTerms} setIsTerms={setIsTerms} />;
```

### alert, confirm 사용법

- props 정보는 직접 확인

```js
import { useAlert, useConfirm, useToast } from '@hooks/useCommonAlert';

const alert = useAlert()
const confirm = useConfirm()
const toast = useToast()

alert({ desc: '' })
confirm({ desc: '' })
toast({ desc: '' })
```

### TextInput 사용방법

```tsx
import TextInput from '@components/TextInput';

<TextInput />
```

#### 속성 정보

- `inputRef`: TextInput에 대한 Ref
  - `iconInfo`: Text 문구 앞에 추가할 아이콘 정보
  - `type`: { iconName?: string; iconComp?: JSX.Element }
  - `hintMessage`: TextInput에 대한 도움말 메세지 내용, isError값을 넣을 경우 error 로 표기
  - `type` => string | { msg: string; isError: boolean }
  - `secureTextEntry`: Text 비공개 여부
  - `onClickClearBtn`: 입력한 Text 초기화 이벤트 및 버튼 노출
  - `editable`: 수정여부 (default true)
  - `rest`: TextInput 속성정보와 동일

### 이미지 경로 참고

- png, gif 이미지

``` js
import { Images } from '@constants'
```

```
Images.gif.xxx
Images.png.xxx
```

- svg 이미지

```js
import IconXxx from '@images/svg/IconXxx.svg'
```

- Svg Component 사용시
  1. type은 SvgStyleProps 타입 사용 (SvgProps 사용 X)
  2. SvgXml 컴포넌트를 사용
  3. 참고는 HablLogo.tsx 참고


### API 사용

- interceptor : `src/hooks/useAxiosInterceptor`
  - url path, needToken 값 정의 : `@api/path/index`
  - axiosGet, axiosPost 사용 : `@api/manager/index`
  - parameter, response 모델 정의 : `@models/${스크린별이름}/${모델명(SNAKE_CASE)}.ts`
  - request, response 모델 설정 : `@api/*.api.ts` -> Screen or Custom Hook 에서 최종적으로 사용하게됨

### 사용자 관련 hooks (update, logout, login, setLocale, snsLogout 등등)

```typescript
import "@hooks/useAuthService";

useAuthService();
```
>>>>>>> 631750ae008612bfe8249a00f67daadd95cee64b
