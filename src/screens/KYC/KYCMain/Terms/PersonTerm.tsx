import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { Colors, Layout } from '@constants'
import {
  TermsHeader,
  TermsHeaderTitle,
  SubHeaderTitle,
  SubContents,
} from './TermsStyle'
import Modal from 'react-native-modal'
import Body from '@components/Body'

export default function KYCPersonComp({
  setIsKYCPerson,
}: {
  setIsKYCPerson: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  return (
    <Modal
      isVisible={true}
      backdropColor={Colors.wh}
      deviceHeight={Layout.window.height}
      backdropOpacity={1}
      style={{ margin: 0 }}
    >
      <Body>
        <TermsHeader setIsModal={setIsKYCPerson} />

        <ScrollArea>
          <TermsHeaderTitle headerTitle="KYC 개인정보 수집 및 이용동의" />

          <ContextBox>
            <SubHeaderTitle title="KYC 개인정보 수집 및 이용 동의를 거부할 권리가 있으며, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우 KYC인증이 어려울 수 있습니다." />
          </ContextBox>

          <ContextBox>
            <SubHeaderTitle
              numbering="1."
              title={`하블은 KYC 인증을 위해 다음과 같은 개인정보를 수집\n합니다.`}
            />
          </ContextBox>

          <ContextBox>
            <SubContents
              numbering="1)"
              boldcontents="수집·이용 목적"
            />
            <SubContents
              contents={`본인확인 및 KYC 인증 의사표시 단계에서 이용자 식별 회원관리`}
            />
          </ContextBox>

          <ContextBox>
            <SubContents
              numbering="2)"
              boldcontents="개인정보의 항목"
            />
            <SubContents
              numbering="⓵"
              contents={`내국인`}
              subContents={[
                {
                  subContents: `국가정보, 이름, 영문이름, 주민등록번호, 성별, 통신사, 휴대전화번호, 연계정보(CI), 중복가입확인정보(DI), 신분증 사본(주민등록증, 자동차운전면허증, 여권), 신분증 발급일자, 자동차운전면허번호, 생년월일, 여권번호, 여권발급일자, 여권만료일자, 거주지 주소, 예금주, 은행명, 계좌번호, PIN 번호`,
                },
              ]}
            />
            <SubContents
              numbering="⓶"
              contents={`외국인`}
              subContents={[
                {
                  subContents: `국가정보, 이름, 휴대폰번호, 자택주소, 생년월일, 성별, 신분증 사본(여권, ID카드), 얼굴사진, 거주지 증명서`,
                },
              ]}
            />
          </ContextBox>
          <ContextBox>
            <SubContents
              numbering="3)"
              boldcontents="보유 및 이용기간"
            />
            <SubContents
              numbering="·"
              contents={`모든 KYC 인증 절차를 진행하지 못한 고객확인 정보는 최대 14일까지 보관 후 파기`}
            />
            <SubContents
              numbering="·"
              contents={`회원 탈퇴 시까지 또는 법령에 따른 보유기간`}
            />
            <SubContents
              numbering="·"
              contents={`법령 및 이용약관을 위반하는 하블 서비스의 부정거래기록`}
            />
            <SubContents
              numbering="⓵"
              contents={`내국인`}
              subContents={[
                {
                  subContents: `국가정보, 이름, 영문이름, 주민등록번호, 성별, 통신사, 휴대전화번호, 연계정보(CI), 중복가입확인정보(DI), 신분증 사본(주민등록증, 자동차운전면허증, 여권), 신분증 발급일자, 자동차운전면허번호, 생년월일, 여권번호, 여권발급일자, 여권만료일자, 거주지 주소, 예금주, 은행명, 졔좌번호, PIN 번호`,
                },
              ]}
            />
            <SubContents
              numbering="⓶"
              contents={`외국인`}
              subContents={[
                {
                  subContents: `국가정보, 이름, 휴대폰번호, 자택주소, 생년월일, 성별, 신분증 사본(여권, ID카드), 얼굴사진, 거주지증명서는 부정거래 방지 및 다른 선량한 이용자의 보호, 안전한 거래 환경 보장을 위하여 수집 시점으로부터 5년간 보관하고 파기`,
                },
              ]}
            />
            <SubContents
              numbering="·"
              contents={`부정이용으로 징계를 받기 전에 회원 가입 및 탈퇴를 반복하며 서비스를 부정 이용하는 사례를 막기 위해 탈퇴한 이용자의 연계정보(CI)를 5년간 보관.`}
            />
          </ContextBox>

          <ContextBox>
            <SubHeaderTitle
              numbering="2."
              title="개인정보 수집 및 이용 동의를 거부할 권리"
            />
          </ContextBox>
          <View style={{ marginBottom: 50 }}>
            <SubContents
              numbering="·"
              contents="이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. KYC 인증 시 수집하는 최소한의 개인정보, 즉 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우 KYC 인증이 어려울 수 있습니다."
            />
          </View>
        </ScrollArea>
      </Body>
    </Modal>
  )
}

const ScrollArea = styled.ScrollView`
  padding: 0 12px;
`
const ContextBox = styled.View`
  margin-bottom: 10px;
`
