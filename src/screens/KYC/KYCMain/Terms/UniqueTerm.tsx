import React from 'react'
import {
  TermsHeader,
  TermsHeaderTitle,
  SubContents,
} from './TermsStyle'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '@constants'
import Modal from 'react-native-modal'
import Body from '@components/Body'

export default function KYCUniqueInfoComp({
  setIsKYCUnique,
}: {
  setIsKYCUnique: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  return (
    <Modal
      isVisible={true}
      backdropColor={Colors.wh}
      backdropOpacity={1}
      style={{ margin: 0 }}
    >
      <Body>
        <TermsHeader setIsModal={setIsKYCUnique} />
        <TermsHeaderTitle headerTitle="고유식별정보 처리 동의" />

        <View>
          <ContextBox>
            <SubContents
              contents={`고유식별정보 처리 동의를 거부할 권리가 있으며, KYC 인증 시 수집하는 고유식별정보에 대한 수집 및 이용동의를 거부하실 경우 KYC 인증이 어려울 수 있습니다.`}
            />
          </ContextBox>
        </View>

        <ContextBox>
          <SubContents
            numbering="1."
            contents={`고유 식별정보 수집 및 이용 목적: ⌜특정 금융거래정보의 보고 및 이용 등에 관한 법률⌟에 따른 고객 확인 및 금융거래등 정보의 보유`}
          />
        </ContextBox>
        <ContextBox>
          <SubContents
            numbering="2."
            contents={`고유식별정보 항목: `}
            subContents={Article2}
          />
        </ContextBox>
        <ContextBox>
          <SubContents
            numbering="3."
            contents={`보유 및 이용기간: 회원 탈퇴 시까지 또는 법령에 따른 보유기간`}
          />
        </ContextBox>
      </Body>
    </Modal>
  )
}

const Article2 = [
  {
    subNumbering: '·',
    subContents:
      '내국인인 경우) 주민등록번호, 자동차운전면허번호, 여권번호',
  },
  {
    subNumbering: '·',
    subContents: '외국인인 경우) 여권번호, ID카드',
  },
]

const ContextBox = styled.View`
  margin-bottom: 10px;
`
