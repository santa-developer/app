import React from 'react'
import {
  TermsHeader,
  TermsHeaderTitle,
  SubContents,
} from './TermsStyle'
import { Colors } from '@constants'
import Modal from 'react-native-modal'
import Body from '@components/Body'
import styled from 'styled-components/native'

export default function KYCServiceComp({
  setIsKYCService,
}: {
  setIsKYCService: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
  return (
    <Modal
      isVisible={true}
      backdropColor={Colors.wh}
      backdropOpacity={1}
      style={{ margin: 0 }}
    >
      <Body>
        <TermsHeader setIsModal={setIsKYCService} />
        <TermsHeaderTitle headerTitle="서비스 이용 유의사항" />

        <ContextBox>
          <SubContents
            contents={`하이블럭스(이하 '회사'라 합니다) 제공하는 HABL 앱 서비스(이하 '서비스'라 합니다)의 이용과 관련하여 아래와 같이 서비스 이용에 관한 유의사항을 안내 드립니다.`}
          />
        </ContextBox>
        <ContextBox>
          <SubContents
            numbering="1."
            contents={`힙스(HIBS)는 법정 화폐 및 금융 투자상품이 아니며, 규제 환경 변화 및 각종 이슈에 따라 시세가 변화되는 높은 변동성을 가지고 있습니다. `}
          />
        </ContextBox>
        <ContextBox>
          <SubContents
            numbering="2."
            contents={`높은 변동성에 따라 실제 결제에 필요한 HIBS 수량이 수시로 변동될 수 있습니다.`}
          />
        </ContextBox>
        <ContextBox>
          <SubContents
            contents={`위 유의 사항을 충분히 숙지하신 후 서비스 이용에 참고 부탁드립니다.`}
          />
        </ContextBox>
      </Body>
    </Modal>
  )
}

const ContextBox = styled.View`
  margin-bottom: 10px;
`
