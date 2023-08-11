/* eslint-disable camelcase */
import HrScreen from '@components/Hr/HrScreen'
import { Layout } from '@constants'
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import Header from '../components/Header'
import SubContents from '../components/SubContents'
import SubHeaderTitleComponent from '../components/SubHeaderTitle'

const TermsComponent = ({
  setIsTerms,
}: {
  setIsTerms: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  return (
    <SafeAreaView>
      <Header setIsModal={setIsTerms} title={'이용약관'} />
      <ScrollView
        style={{
          paddingHorizontal: 15,
        }}
      >
        <SubHeaderTitleComponent title="하이블럭스 이용약관" />
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제1장 총칙" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제1조 (목적)" />
          <SubContents
            contents={`이 약관은 주식회사 하이블럭스(이하 "회사")가 제공하는 서비스("회원"이 모바일 등의 디지털에 IOS 혹은 ANDROID 운용체제에 따른 Application 프로그램을 통하여 이용할 수 있도록 회사가 제공하는 SNS의 모든 서비스를 의미)와 관련하여, 회원의 서비스 이용조건 및 절차, 회사와 회원 간의 권리ㆍ의무 및 책임사항 기타 필요한 사항을 규정함을 목적으로 합니다.`}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제2조 (용어의 정의)" />
          <SubContents
            numbering="⓵"
            contents="이 약관에서 사용하는 용어의 정의는 다음과 같습니다."
            subContents={Article2}
          />
          <SubContents
            numbering="⓶"
            contents="이 약관에서 사용하는 용어의 정의는 제1항에서 정하는 것을 제외하고는 관계 법령 및 각 서비스 별 안내에서 정하는 바에 의합니다. 관계 법령과 각 서비스 별 안내에서 정하지 않는 것은 일반적인 상관례에 의합니다."
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제3조 (약관의 효력, 명시와 개정)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있습니다. 회사는 약관이 변경되는 경우에 변경된 약관의 내용과 시행일을 정하여, 그 시행일로부터 7일전 홈페이지에 온라인으로 공시합니다. 다만, 이용자에게 불리하게 약관 내용을 변경하는 경우에는 시행일로부터 30일전 홈페이지에 온라인으로 공시하거나 회원이 회원 가입 시 등록한 E-mail 또는 문자 메시지 등으로 발송할 수 있습니다. 변경된 약관은 공시하거나 고지한 시행일로부터 효력이 발생합니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회원은 변경된 약관에 대해 거부할 권리가 있습니다. 본 약관의 변경에 대해 이의가 있는 회원은 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다. 회원이 변경된 이용약관의 시행일 이후에도 서비스를 계속 이용하는 경우에는 변경된 약관에 동의한 것으로 간주합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회원이 개정약관의 적용에 동의하지 않는다는 명시적 의사를 표명한 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는 회사는 이용계약을 해지할 수 있습니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`본 약관에서 규정된 내용이 개별 서비스 약관에서 정한 이용 규정과 충돌하는 경우에는 본 통합약관의 규정이 우선하여 적용됩니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제4조(약관의 규정 외 사항에 관한 준칙)" />
          <SubContents
            contents={`이 약관에 규정되지 않은 사항과 이 약관의 해석에 대해서는 회사가 정한 개별 서비스 이용약관, 운영정책 및 관계법령이 적용됩니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제2장 제공서비스" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제5조(HIBS 지갑서비스)" />
          <SubContents
            numbering="⓵"
            contents={`회원은 지급받은 HIBS를 플랫폼 내의 지갑에 보관할 수 있으며, 스테이킹(예치)하여 예치금에 대하여 일정한 비율로 보상을 받을 수 있습니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회원은 회원간 앱내 지갑서비스를 통해 앱내 및 앱 외부로HIBS를 이동할 수 있습니다.`}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제6조 (보상체계)" />
          <SubContents
            numbering="⓵"
            contents={`보상의 대상`}
            subContents={Article6_1}
          />
          <SubContents
            numbering="⓶"
            contents={`보상지급방법`}
            subContents={Article6_2}
          />
          <SubContents
            numbering="⓷"
            contents={`랭킹 - 회사 SNS 플랫폼에서 보상의 기준이 되는 시스템`}
            subContents={Article6_3}
          />
          <SubContents
            numbering="⓸"
            contents={`보상의 주기`}
            subContents={Article6_4}
          />
          <SubContents
            numbering="⓹"
            contents={`보상 금액`}
            subContents={Article6_5}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제7조 (HIBS사용서비스 등)" />
          <SubContents
            numbering="⓵"
            contents={`챌린지: 개인 또는 기업회원은 챌린지이벤트를 개설하여 이벤트에 참여한 회원에게 보상을 제공할 수 있습니다. 챌린지는 일반챌린지, 광고챌린지, 후원챌린지로 나뉩니다.`}
          />
          {/* <SubContents
          numbering="⓶"
          contents={`챌린지 RUN: 증강현실을 기반으로, 이용자는 원하는 위치에 HIBS아이콘을 설치하고, 챌린지에 참여한 회원은 해당 지역에서 HIBS아이콘을 터치하여 보상을 획득할 수 있습니다.`}
        /> */}
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제3장 서비스 이용 계약" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제8조 (서비스 이용 신청 및 이용계약의 성립)" />
          <SubContents
            numbering="⓵"
            contents={`회사가 제공하는 서비스를 이용하고자 하는 자가 본 약관의 내용에 대하여 동의를 한 다음 회사가 제시하는 양식과 절차에 따라 이용 신청을 하고, 그 신청한 내용에 대해 회사가 승낙함으로써 회사와 이용자 간 이용 계약이 체결됩니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`이용자는 제1항의 이용 신청 시 반드시 본인의 실제 정보를 기재하여야 합니다. 이를 준수하지 않은 회원은 일체의 권리를 주장할 수 없으며, 관련법에 따라 처벌을 받을 수 있습니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`이용 계약이 성립되면 회사는 ID를 통해 회원에 대한 제반 관리 업무를 수행하며, 회원은 본 약관 운영정책, 회사가 설정한 규칙에 따라 서비스를 이용할 수 있습니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회원은 회사가 정한 절차에 의해 ID를 생성할 수 있으며, 각 ID를 통해 당해 회사가 제공하는 서비스를 이용할 수 있습니다. 단, 회사가 제시하는 절차를 완료하지 않은 회원은 일부 서비스 이용에 제한이 있을 수 있습니다.`}
          />
          <SubContents
            numbering="⓹"
            contents={`회사가 다른 회사와의 협력, 중개 계약을 통해 제공하는 서비스에 대한 내용, 제3자 회사의 의무, 이용자의 권리와 의무 등 상세 사항은 해당 서비스에 대하여 제3자가 제공하는 별도 약관, 운영정책 등에서 정하는 바에 따릅니다. 이용자가 해당 서비스를 이용할 경우, 제3자가 제공하는 서비스 이용 약관에 대한 동의가 필요할 수 있습니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제9조 (이용신청에 대한 승낙의 제한)" />
          <SubContents
            numbering="⓵"
            contents={` 회사는 이용 고객의 회원 신청에 대하여 업무상 또는 기술상의 문제가 없는 경우 서비스 이용을 승낙함을 원칙으로 합니다. 단, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않을 수 있습니다.`}
            subContents={Article9_1}
          />
          <SubContents
            numbering="⓶"
            contents={`회사는 다음 각 호의 경우에 원인이 해소될 때까지 승낙을 유보할 수 있습니다.`}
            subContents={Article9_2}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제4장 서비스의 이용" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제10조 (서비스의 이용개시)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 이용 고객의 회원 가입을 승낙한 때부터 서비스를 개시합니다. 단, 일부 서비스의 경우에는 회사의 필요에 따라 지정된 일자부터 서비스를 개시하거나, 별도의 약관 체결이 필요한 경우 별도의 약관 동의를 포함한 관련 절차가 완료된 후 서비스를 개시할 수 있습니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회사의 업무상 또는 기술상의 장애로 인하여 서비스를 개시하지 못하는 경우에는 홈페이지 또는 개별 서비스 관련 홈페이지에 공지하거나 회원에게 이를 고지합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 각 서비스 이용에 필요한 최소 또는 권장 기술 사양 정보를 각 서비스 별 홈페이지를 통해 제공합니다. 회원은 각 서비스 이용을 위해 기기 사양, 유무선 통신망의 품질 등이 해당 서비스 이용에 적합한지 여부를 확인하여야 합니다. 서비스 업데이트와 기술 발전 등의 환경 변화로 서비스 이용에 필요한 기술 사양 정보가 변경될 수 있으며, 회사는 기술 사양 정보의 변경으로 인한 책임을 부담하지 않습니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제11조 (서비스의 제공 및 중단 등)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 회원에게 아래와 같은 서비스를 제공합니다.`}
            subContents={Article11_1}
          />
          <SubContents
            numbering="⓶"
            contents={`제1항 상의 각 서비스 및 제휴 서비스의 내용은 변경될 수 있으며, 이 경우 회사는 앱, 홈페이지 등을 통해 이용자에게 공지합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`서비스의 이용을 제한하거나 정지하는 때와 무료서비스를 유료로 전환하는 때에는 그 사유 및 제한기간, 전환예정 일시 등을 지체 없이 이용고객에게 알려야 합니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`다음 각 호에 해당하는 경우, 일정 시간 동안 서비스가 제공되지 아니할 수 있으며, 해당 시간 동안 회사는 서비스를 제공할 의무가 없습니다.`}
            subContents={Article11_4}
          />
          <SubContents
            numbering="⓹"
            contents={`회사는 제4항 제1호의 경우, 매주 또는 격주 단위로 일정 시간을 정하여 서비스를 중지할 수 있습니다. 이 경우 회사는 최소한 24시간 전에 그 사실을 회원에게 홈페이지나 앱에 공지합니다.`}
          />
          <SubContents
            numbering="⓺"
            contents={`제4항 제2호의 경우, 회사는 원칙적으로 사전에 서비스 제공 중단 및 중단사유를 고지하나, 사전에 고지하기 어려운 특별한 사정이 있는 경우 위 내용을 홈페이지나 앱에 사후 고지할 수 있습니다.`}
          />
          <SubContents
            numbering="⓻"
            contents={`회사는 회사가 제공하는 무료 서비스 이용과 관련하여 이용자에게 발생한 어떠한 손해에 대해서도 책임을 지지 않습니다. 다만, 회사의 고의 또는 중대한 과실로 인하여 발생한 손해의 경우는 제외합니다.`}
          />
          <SubContents
            numbering="⓼"
            contents={`회사는 회사가 제공하는 유료서비스 이용과 관련하여 회사의 귀책사유로 사전고지 없이 1일 4시간(누적시간) 이상 연속하여 서비스가 중지되거나 장애가 발생한 경우 계속적 이용 계약에 한하여 서비스 중지·장애시간의 3배에 해당하는 이용시간을 무료로 연장하고, 이용자는 회사에 대하여 별도의 손해배상을 청구할 수 없습니다. 다만, 회사가 서버점검 등의 사유로 서비스 중지·장애를 사전에 고지하였으나, 서비스 중지·장애시간이 10시간이 초과하는 경우에는 그 초과된 시간만큼 이용시간을 무료로 연장하고, 이용자는 회사에 대하여 별도의 손해배상을 청구할 수 없습니다.`}
          />
          <SubContents
            numbering="⓽"
            contents={`제4항 제4호의 경우에 회사는 기술상, 운영상 필요에 의해 서비스 전부를 중단할 수 있으며, 30일 전에 홈페이지에 이를 공지하고 서비스의 제공을 중단할 수 있습니다. 사전에 통지할 수 없는 부득이한 사정이 있는 경우는 사후에 통지를 할 수 있습니다.`}
          />
          <SubContents
            numbering="⑩"
            contents={`회사가 제9항에 따라 서비스를 종료하는 경우 회원은 무료 서비스, 유료 서비스 등 이용계약에 대하여 환불 및 손해배상을 청구할 수 없습니다.`}
          />
          <SubContents
            numbering="⑪"
            contents={`제공하는 서비스의 운영상 지장을 주는 다량의 정보를 전송하여 서비스의 안정적 운영을 방해하는 경우 또는 지적재산권을 침해하는 경우에는 서비스 이용을 중단시킬 수 있습니다.`}
          />
          <SubContents
            numbering="⑫"
            contents={`공직선거법 등 관련 규정에 위배되는 선거 운동을 하는 콘텐츠를 배포 및 공유할 경우 이용을 제한할 수 있습니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제12조 (정보의 제공 및 수집 등)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 회원이 등록한 E-mail 또는 문자 메시지 등으로 고지하거나 또는 홈페이지에 공지하는 방식으로 회원에게 정보 등을 제공 할 수 있습니다. 단, 회사는 e-mail 서비스 제공사의 제한에 의해 개별통지가 불가한 경우 및 회원이 e-mail 또는 연락처를 잘못 기재하여 등록한 경우 발생하는 문제에 대해서는 책임을 지지 않습니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회사는 회사가 제공하는 서비스 내에서 이용자 간에 이루어지는 내용(게시물, 댓글 등) 등을 저장, 보관, 또는 열람할 수 있습니다. 회사는 이용자 간의 분쟁 조정, 민원 처리 또는 플랫폼 질서의 유지를 위하여 회사가 필요하다고 판단하는 경우에만 한정하여 해당 정보를 열람하도록 합니다. 해당 정보는 회사만이 보유하고 적법한 제3자 외에는 제공되지 않습니다. 자료 활용 시에는 활용이 필요한 이유 및 범위를 이용자에게 고지합니다. 다만, 계정도용, 현금거래, 언어폭력, 플랫폼 내 사기 등 기망행위, 버그 악용, 기타 현행 법령 위반행위 및 이 약관 제11조에서 정하는 중대한 약관위반 행위의 조사, 처리, 확인 및 이의 구제와 관련하여 회원의 해당 정보를 열람해야 할 필요가 있는 경우에는, 사후에 해당 정보가 열람된 개인들에 대하여 열람한 사유와 열람한 정보 중 본인과 관련된 부분을 고지하기로 합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 서비스의 안정화 및 오류개선, 악성코드 감염여부 확인 등을 위해 회원들의 개인정보를 제외한 PC사양 및 시스템 정보, 오류 정보를 수집할 수 있습니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회사는 서비스 개선 및 회원 대상 서비스 소개 등을 위한 목적으로 회원 개인에 대한 추가정보를 요구할 수 있으며, 동 요청에 대해 회원은 승낙하여 추가정보를 제공하거나 거부할 수 있습니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제4장 계약당사자의 의무" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제13조 (회사의 의무)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 법령과 본 약관이 금지하거나 미풍 양속에 반하는 행위를 하지 않으며, 계속적이고 안정적인 서비스를 제공하기 위하여 노력합니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회사는 회원의 개인정보보호를 위해 보안시스템을 구축하며 개인정보처리방침을 공시하고 준수합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 회원의 개인정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않습니다. 단, 전기통신관련법령 등 관계법령에 의하여 관련 국가기관 등의 요구가 있는 경우에는 그러하지 아니합니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회사는 이용고객으로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우에는 즉시 처리합니다. 다만, 즉시 처리가 곤란한 경우에는 이용자가 기입한 전화나 e-mail로 그 사유와 처리일정을 통보할 수 있습니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제14조 (회원의 의무)" />
          <SubContents
            numbering="⓵"
            contents={`이용고객은 회원 가입 신청 시 모든 사항을 사실에 근거하여 기재하여야 하며, 허위의 정보를 등록할 경우 또는 타인 명의의 ID에 대해서 일체의 권리를 주장할 수 없습니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회원은 회사가 제공하는 서비스를 이용함에 있어 다음 각 호의 행위 또는 다음 각호에 해당 하는 내용을 목적으로 하거나 의도하는 행위를 하여서는 안됩니다.`}
            subContents={Article14_2}
          />
          <SubContents
            numbering="⓷"
            contents={`회원은 관계 법령 및 본 약관의 규정을 비롯하여 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안됩니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회원은 회사에서 공식적으로 인정한 경우를 제외하고는 회사가 제공하는 서비스를 이용하여 상품을 판매하는 등의 영업활동을 할 수 없으며 서비스를 통해 취득한 아이템 및 ID 등을 거래에 제공하거나 제공받을 수 없습니다. 이를 위반하여 발생한 영업 활동의 결과 및 손실, 관계기관에 의한 구속 등 법적 조치 등에 관해서는 전적으로 회원의 책임으로 하며 회사는 이에 대해 일체의 책임을 지지 않습니다. 만약 회원의 이와 같은 행위와 관련하여 회사에 손해가 발생한 경우 회원은 일체의 손해배상 의무를 부담합니다.`}
          />
          <SubContents
            numbering="⓹"
            contents={`회원이 하이블럭스 페이지(스페이스)에 게시할 수 있는 컨텐츠 수는 제한되어 있지 않지만 향후 내부규정에 따라 변경될 수 있습니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제15조 (개인정보의 관리 등)" />
          <SubContents
            numbering="⓵"
            contents={`회원은 본 서비스의 이용을 위해 자신의 개인정보를 성실히 관리해야 하며 회원이 입력한 개인 정보에 변동사항이 있을 경우 이를 변경해야 합니다. 회원의 개인정보변경이 지연되거나 누락되어 발생되는 손해는 회원의 책임으로 합니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회원은 자신의 ID와 비밀번호가 노출되지 않도록 최선의 주의를 다하여야 합니다. 회원의 과실로 인해 ID와 비밀번호가 노출되어 발생하는 피해 및 결과에 대한 책임은 회원에게 있습니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회원이 자신의 서비스 이용 권한 또는 서비스 이용 계약상의 지위를 제3자에게 양도, 대여하거나 담보로 제공하여 야기된 결과에 대한 책임은 해당 회원에게 있습니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회원은 본인의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안되며, 회원 본인의 ID 및 비밀번호를 도난 당하거나 제3자가 사용하고 있음을 알게 된 때에는 즉시 회사에 통보하고 회사의 안내가 있는 경우 그에 따라야 합니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제5장 서비스이용제한 및 계약해지 등" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제16조 (서비스이용제한 및 계약해지)" />
          <SubContents
            numbering="⓵"
            contents={`회원은 회원의 사정으로 인하여 서비스의 이용 중지나 회원 탈퇴를 요청할 수 있습니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회원이 회원 탈퇴를 원하는 경우, 아래의 e-mail 또는 서비스별 홈페이지(회사가 별도로 홈페이지를 통해 해지할 수 있도록 하는 경우에 한함)를 통하여 회원 탈퇴를 신청할 수 있으며, 이후 회사가 안내하는 절차를 이행해주시면 됩니다.\n고객센터 E-mail : team@hiblocks.io`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 회원이 다음 각 호에 해당하는 경우, 제10조 제1항의 방법 또는 기타 유효한 수단을 통해 해당 회원에게 통지하고 운영정책에 의거하여 해당 사유가 해소될 때까지 회원의 서비스 이용을 중지 또는 제한하는 등 합당한 조치를 취할 수 있습니다.`}
            subContents={Article16_3}
          />
          <SubContents
            numbering="⓸"
            contents={`회사는 회원이 다음 각 호에 해당하는 경우, 회사는 제 10조 제1항의 방법 또는 기타 유효한 수단을 통해 해당 회원에게 통지하고 회원자격을 박탈할 수 있습니다.`}
            subContents={Article16_4}
          />
          <SubContents
            numbering="⓹"
            contents={`회원이 본 조 제3항 또는 제4항에 따라 서비스 이용이 제한되거나 회원 자격이 박탈되는 경우, 포인트 및 HIBS는 소멸 됩니다.`}
          />
          <SubContents
            numbering="⓺"
            contents={`회사는 본 조 제3항 및 제4항, 운영 정책에서 제재사유에 해당하는 불법행위를 반복적으로 수행하는 이용자의 경우, 회원 자격을 박탈하고 동일한 신상정보로 재가입하는 것을 제한할 수 있습니다.`}
          />
          <SubContents
            numbering="⓻"
            contents={`회사는 본 조 제4항을 적용함에 있어 회사가 적절하다고 판단하는 경우 제3항의 조치로 경감할 수 있습니다.`}
          />
          <SubContents
            numbering="⓼"
            contents={`회사는 회원의 ID가 부당한 목적으로 사용되는 것을 방지하고 보다 원활한 서비스 제공을 위하여 다음의 요건을 모두 충족하는 경우에 한하여 해당 ID를 휴면 ID로 분류하고, ID 및 계정 등의 정보를 삭제할 수 있습니다. 운영 정책에서 정한 일정 기간 이상 접속 기록이 없는 회원의 ID`}
          />
          <SubContents
            numbering="⓽"
            contents={`회원은 상기의 조치에 대하여 회사가 정한 절차에 따라 이의신청을 할 수 있습니다.`}
          />
          <SubContents
            numbering="⑩"
            contents={`회원의 서비스 이용 해지, 회원박탈 등으로 인해 회원과 회사의 서비스 이용 계약이 종료되는 경우, 관계법령에서 정하는 경우를 제외하고 회사는 보다 나은 서비스 환경의 유지 등을 위하여 ID 및 해당 ID와 관련한 모든 정보를 삭제할 수 있습니다. 따라서 회원은 서비스 이용 계약 종료 이전에 보관이 필요한 정보는 별도로 백업하여야 하며, 회사는 이용계약 종료 이후 회원의 ID관련 정보 및 콘텐츠 삭제로 인한 책임을 부담하지 않습니다.`}
          />
          <SubContents
            numbering="⑪"
            contents={`회원 탈퇴가 완료되면, 탈퇴 후 일정 기간 내 회원 가입이 불가능할 수 있습니다.`}
          />
          <SubContents
            numbering="⑫"
            contents={`회원은 불쾌감을 주는 콘텐츠나 악의적인 사용자에게 아래와 같은 조치를 취할 수 있습니다.`}
            subContents={Article16_12}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제17조 (미성년자 법정대리인의 계약취소권)" />
          <SubContents
            contents={`미성년자인 회원이 그 법정대리인의 동의를 받지 않고 요금결제 등 의무부담행위를 한 경우, 미성년자인 회원 또는 그 미성년자의 법정대리인은 관련법령에 따라 해당 계약을 취소할 수 있습니다. 단, 미성년자가 속임수로써 자기를 성인으로 믿게 한 경우에는 취소권이 제한될 수 있습니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제6장 청소년에 대한 보호" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제18조 (청소년에 대한 보호)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 청소년이 건강한 인격체로 성장할 수 있도록 하기 위해, '정보통신망 이용 촉진 및 정보보호 등에 관한 법률' 및 '청소년보호법'에 근거한 청소년 보호정책을 명시하고 있습니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회사는 청소년이 아무런 제한장치 없이 청소년 유해정보에 노출되지 않도록 청소년 유해매체물에 대해서는 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제42조에 따라 청소년유해매체물임을 표시합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 청소년 유해정보로 인한 피해상담 및 고충처리를 위한 전문인력을 배치하여 피해가 확산되지 않도록 노력하고 있습니다. 또한 자체적으로 처리가 곤란할 경우 피해 특성별로 관련기관을 안내해 드립니다.`}
            subContents={Article18_3}
          />
          <SubContents
            numbering="⓸"
            contents={`회사는 청소년 유해정보의 차단 및 관리, 청소년 보호정책을 수립하는 등 청소년보호업무를 수행하기 위해 아래와 같이 청소년 보호책임자를 지정하였습니다.`}
            subContents={Article18_4}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제7장 손해배상 등" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제19조 (손해배상)" />
          <SubContents
            numbering="⓵"
            contents={`회원이 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 위반한 회원은 회사에 발생하는 손해를 배상하여야 합니다. 다만 회사에게 귀책사유가 있는 부분은 회사가 책임을 부담합니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회원이 서비스를 이용함에 있어 행한 불법행위나 본 약관 위반 행위로 인하여 회사가 당해 회원 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의 제기를 받는 경우 당해 회원은 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가 면책되지 못한 경우 당해 회원은 그로 인하여 회사에 발생한 손해를 배상하여야 합니다. 단 회사에게 귀책사유가 있는 부분은 회사가 책임을 부담합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 무료로 제공하는 서비스와 관련하여 발생하는 사항에 대하여는 어떠한 손해도 책임을 지지 않습니다. 단, 회사의 고의나 중과실로 인한 손해인 경우는 예외로 합니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회사는 블록체인의 문제 및 보상시스템 관리 시스템 자체의 하자 또는 기술적 문제, 통신서비스 업체의 불량, 정기적인 서버점검 등으로 인하여 불가피하게 장애가 발생하였을 경우에 책임을 지지 않습니다. 다만, 회사의 고의 또는 과실에 의한 경우에는 그러하지 아니합니다.`}
          />
          <SubContents
            numbering="⓹"
            contents={`회원이 회사에게 손해배상을 청구할 경우 회사는 회원과 합의하여 회원의 전자지갑으로 암호화폐 또는 원화포인트(KRW)를 지급하는 방법으로 회원의 손해를 배상할 수 있습니다.`}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제20조 (면책사항)" />
          <SubContents
            numbering="⓵"
            contents={`회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`회사는 이용자의 귀책사유로 인한 서비스의 중지 또는 이용장애, 계약해지에 대하여 책임을 지지 않습니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사는 기간통신 사업자가 전기통신서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 회사의 고의 또는 중과실이 없는 한 책임이 면제됩니다.`}
          />
          <SubContents
            numbering="⓸"
            contents={`회사가 제공하는 서비스는 이용자의 개별적 행위에 따라 다양한 결과가 발생할 수 있으므로 회사는 이용자의 취사선택 등으로 발생하는 문제에 대하여는 책임을 부담하지 않습니다.`}
          />
          <SubContents
            numbering="⓹"
            contents={`회사는 이용자의 컴퓨터 환경으로 인하여 발생하는 제반 문제 또는 회사의 귀책사유가 없는 네트워크 환경으로 인하여 발생하는 문제에 대해서는 일체 책임을 지지 않습니다.`}
          />
          <SubContents
            numbering="⓺"
            contents={`회사는 이용자가 서비스 내 또는 웹사이트 상에 게시 또는 전송한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대해서는 회사의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.`}
          />
          <SubContents
            numbering="⓻"
            contents={`회사는 이용자 상호간 또는 이용자와 제3자간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를 배상할 책임을 지지 않습니다.`}
          />
          <SubContents
            numbering="⓼"
            contents={`회사는 회원의 컴퓨터 오류에 의한 손해가 발생한 경우 또는 신상정보 및 전자우편주소를 부정확하게 기재하거나 기재하지 아니하여 손해가 발생한 경우에 대하여 책임을 부담하지 않습니다.`}
          />
          <SubContents
            numbering="⓽"
            contents={`회사는 회원이 서비스를 이용하면서 취득한(회사를 통해 직접 유료 구매한 것은 제외) 등급, 아이템, 콘텐츠 등의 손실에 대해서 회사 또는 회사 직원의 고의 또는 중대한 과실로 인한 경우를 제외하고는 책임을 부담하지 않습니다.`}
          />
          <SubContents
            numbering="⑩"
            contents={`회사가 다른 사업자가 제공하는 서비스를 중개하는 경우 해당 서비스와 관련된 의무와 책임은 개별 서비스 제공자에게 있으며, 이로 인하여 발생한 손해 등에 대해서는 회사는 원칙적으로 책임을 부담하지 않습니다. 다만, 회사는 관련 법령에 따라 책임을 부담할 수 있습니다.`}
          />
          <SubContents
            numbering="⑪"
            contents={`회사는 관련 법령, 정부 정책 등에 따라 서비스 또는 회원에 따라 서비스 이용시간을 제한할 수 있으며, 이러한 제한 사항 및 제한에 따라 발생하는 서비스 이용 관련 제반 사항에 대해서는 책임을 부담하지 않습니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제21조 (이의신청 절차)" />
          <SubContents
            contents={`회원은 서비스를 이용함에 있어 발생한 사안에 대한 이의 또는 본 약관과 관련한 이의를 회사가 마련하는 고객센터에 할 수 있으며, 회사는 고객의 이의가 정당하다고 인정되는 때에는 그에 상응하는 조치를 취합니다.`}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제22조 (관할법원)" />
          <SubContents
            numbering="⓵"
            contents={`서비스 이용과 관련하여 회사와 회원 간에 이견 또는 분쟁이 있는 경우, 양 당사자간의 합의에 의해 원만히 해결하여야 합니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`만약 제1항의 분쟁이 원만히 해결되지 못하여 소송이 제기된 경우, 소송은 관련 법령에 정한 절차에 따른 법원을 관할 법원으로 합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사와 이용자간에 제기된 소송에는 대한민국 법을 적용합니다.`}
          />
        </View>

        <View style={{ marginBottom: Layout.headerHeight }}>
          <SubContents boldcontents="[부칙]" />
          <SubContents
            contents={`이 약관은 2021년 07월 26일부터 시행합니다.`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Article2 = [
  {
    subNumbering: '1',
    subContents:
      '이용 계약: 회사가 제공하는 서비스 이용과 관련하여 회사와 회원이 되고자 하는 자 간에 체결하는 계약을 말합니다.',
  },
  {
    subNumbering: '2',
    subContents:
      '회원: 회사가 제공하는 절차에 따른 가입 신청 및 이용 계약 체결을 완료한 뒤, ID를 발급받아 회사의 서비스를 이용할 수 있는 자를 말합니다.',
  },
  {
    subNumbering: '3',
    subContents:
      'ID: 회원 식별과 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 문자, 특수문자, 숫자 등의 조합을 말합니다.',
  },
  {
    subNumbering: '4',
    subContents:
      'PASSWORD(이하 "비밀번호"라고 함): 회원이 자신의 ID 또는 체험 ID와 일치하는 이용고객임을 확인하기 위해 선정한 문자, 숫자 등의 조합을 말합니다.',
  },
  {
    subNumbering: '5',
    subContents:
      '회사플랫폼에서의 보상(REWARD)란 업로드 된 콘텐츠, 운영중인 스페이스에 대한 인기도와 회원들의 활동점수로 집계된 각각의 랭킹을 통해 포인트 및 HIBS를 지급하는 행위를 말합니다.',
  },
  {
    subNumbering: '6',
    subContents:
      '포인트(Point): 회사에서 지급하는 점수이며, 추후 플랫폼 내에서 HIBS로 보상 받습니다. 포인트는 그 성격 및 목적상 4개 다른 형태로 제공되며, 주로 회사 플랫폼내에서 활동을 통해 얻을 수 있는 점수입니다.',
  },
  {
    subNumbering: '7',
    subContents:
      'HIBS: 포인트를 코인으로 제공한 보상 지급 수단으로, 하이블럭스 플랫폼 내 경제순환 구조를 구축하기 위하여 발행된 가상자산입니다.',
  },
  {
    subNumbering: '8',
    subContents:
      '보팅(Voting): 콘텐츠의 가치를 매기는 제한된 투표 수단으로서 모든 회원에게 20분에 한 개씩 최대24개까지 주어집니다. 실행한 Voting은 취소할 수 없습니다.',
  },
  {
    subNumbering: '9',
    subContents:
      '랭킹(Ranking): 보상의 기준이 되는 활동으로 산정된 포인트 및 이용자의 예치량을 반영하여 최종적으로 등급을 연산 및 저장하는 오프체인 시스템입니다.',
  },
]

const Article6_1 = [
  {
    subNumbering: '1',
    subContents:
      '콘텐츠에 대한 보상과 스페이스 운영, 헌터, 이벤트 보상 네 가지로 나뉘어 지급됩니다.',
  },
  {
    subNumbering: '2',
    subContents:
      '포인트로 랭킹을 선정하며 획득한 포인트별로 보상이 지급됩니다.',
  },
]

const Article6_2 = [
  {
    subNumbering: '1',
    subContents:
      '활동 보상의 경우 주간 자신이 작성한 콘텐츠에 대한 보팅 및 좋아요를 받거나, 콘텐츠에 대한 보팅 및 좋아요, 공유를 함에 따라 주 단위로 포인트를 받을 수 있습니다.',
  },
  {
    subNumbering: '2',
    subContents:
      '스페이스 운영자 보상의 경우 주간 자신이 운영자로 있는 스페이스의 총 방문자수, 팔로워 수, 게시글 수에 따라 주 단위로 포인트를 받을 수 있습니다.',
  },
  {
    subNumbering: '3',
    subContents:
      '개인 스테이킹 보상의 경우 여유자금을 블록체인 네트워크에 보관하는 대가로 수익보상을 받는 서비스로 개인 스테이킹 금액을 전체 스테이킹 금액의 점유율로 환산후 보상풀 금액을 곱하여 HIBS를 받을 수 있습니다.',
  },
  {
    subNumbering: '4',
    subContents:
      '헌터 보상의 경우 주간 스테이킹(예치금) 금액이 기준 금액 이상에 해당하는 회원에 대하여 신고권한이 주어지며, 해당 회원이 악성 또는 음란 게시물을 신고 후 관리자가 해당 게시물을 신고 게시물로 확정할 경우 확정된 게시물의 수에 따라 포인트를 받을 수 있습니다.',
  },
  {
    subNumbering: '5',
    subContents:
      '이벤트 보상의 경우 스테이킹(예치금) 등급별 무작위 추첨으로 제공되며 대가로 HIBS를 받을 수 있습니다.',
  },
]

const Article6_3 = [
  {
    subNumbering: '1',
    subContents:
      '회사는 콘텐츠 랭킹과 스페이스 운영자 랭킹, 헌터 랭킹, 이벤트 랭킹 네가지를 운영합니다.',
  },
  {
    subNumbering: '2',
    subContents:
      '콘텐츠 랭킹은 보팅, 좋아요, 댓글 등의 콘텐츠의 인기도를 주 기준으로 하여 집계합니다.',
  },
  {
    subNumbering: '3',
    subContents:
      '스페이스 운영자 랭킹은 총 방문자, 팔로워 등의 스페이스의 활동 점수를 주 기반으로 하여 집계합니다.',
  },
]

const Article6_4 = [
  {
    subNumbering: '1',
    subContents: '보상은 주 단위로 이루어집니다.',
  },
  {
    subNumbering: '2',
    subContents:
      '매 주의 랭킹을 집계하여 랭킹 집계가 끝난 후 HIBS를 지급합니다.',
  },
]

const Article6_5 = [
  {
    subNumbering: '1',
    subContents:
      '매주 전체 보상 HIBS를 책정하고, 전체 보상 HIBS를 순위별로 차등 지급합니다.',
  },
  {
    subNumbering: '2',
    subContents: '매주 보상 금액은 다르게 책정될 수 있습니다.',
  },
]

const Article9_1 = [
  {
    subNumbering: '1',
    subContents:
      '본 약관 제14조 제2항 각 호에서 금지하고 있는 사항을 위반하여 신청한 경우',
  },
  {
    subNumbering: '2',
    subContents:
      '본 약관 제16조 제6항에 의거, 재가입이 제한된 이용자에 해당되는 경우',
  },
  {
    subNumbering: '3',
    subContents:
      '회원 탈퇴 후 1개월 이내 회원 가입을 재신청하려는 경우',
  },
  {
    subNumbering: '4',
    subContents:
      '법에서 금지하는 위법 행위를 할 목적으로 이용 신청을 하는 경우',
  },
  {
    subNumbering: '5',
    subContents:
      '기타 회원으로서 부적절한 행위를 할 우려가 있다고 인정되는 경우',
  },
]
const Article9_2 = [
  {
    subNumbering: '1',
    subContents: '회사의 설비에 여유가 없는 경우',
  },
  {
    subNumbering: '2',
    subContents:
      '기술상 서비스를 처리하지 못할 장애 사항이 발생한 경우',
  },
  {
    subNumbering: '3',
    subContents:
      '이용자가 관련 법령에 따른 법정 대리인 동의 등 필요한 절차를 완료하지 않은 경우',
  },
  {
    subNumbering: '4',
    subContents:
      '회사가 제시하는 회원 가입 절차를 완료하지 않은 경우',
  },
  {
    subNumbering: '5',
    subContents:
      '기타 회원으로서 부적절한 행위를 할 우려가 있다고 인정되는 경우',
  },
]

const Article11_1 = [
  {
    subNumbering: '1',
    subContents:
      '회사 서비스 및 회사에 부수되는 콘텐츠, HIBS 등의 제반 서비스',
  },
  {
    subNumbering: '2',
    subContents:
      '기타 회사가 자체 개발하거나 다른 회사와의 협력 계약 등을 통해 회원에게 제공하는 일체의 서비스',
  },
]
const Article11_4 = [
  {
    subNumbering: '1',
    subContents:
      '컴퓨터 등 정보통신설비의 보수점검, 교체, 정기점검 또는 회사 서비스의 수정을 위하여 필요한 경우',
  },
  {
    subNumbering: '2',
    subContents:
      '해킹 등의 전자적 침해사고, 통신사고, 회원들의 비정상적인 이용행태, 미처 예상하지 못한 불안정성에 대응하기 위하여 필요한 경우',
  },
  {
    subNumbering: '3',
    subContents:
      '천재지변, 비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능할 경우',
  },
  {
    subNumbering: '4',
    subContents:
      '회사의 분할, 합병, 영업양도, 영업의 폐지, 당해 서비스의 수익 악화, 당해 서비스 권한 상실 등 회사의 경영상 중대한 필요에 의한 경우',
  },
]

const Article14_2 = [
  {
    subNumbering: '1',
    subContents:
      '회원 가입 신청이나 회원정보 변경 시 실명이 아닌 정보 또는 다른 사람의 정보를 사용하거나, 허위 사실 기재',
  },
  {
    subNumbering: '2',
    subContents: '다른 회원의 ID 및 비밀 번호를 도용, 부정하게 사용',
  },
  {
    subNumbering: '3',
    subContents:
      '회사가 제공하는 서비스의 공식 운영자를 사칭하거나 유사한 명칭을 사용하여 다른 이용고객에게 혼란을 초래하는 행위',
  },
  {
    subNumbering: '4',
    subContents:
      '회사의 서비스 또는 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제, 유통, 조장하거나 상업적으로 이용',
  },
  {
    subNumbering: '5',
    subContents: '타인의 명예를 훼손하거나 손해를 가하는 행위',
  },
  {
    subNumbering: '6',
    subContents:
      '회사의 지적재산권, 제3자의 지적재산권, 초상권 등 기타 권리를 침해',
  },
  {
    subNumbering: '7',
    subContents:
      '회사의 승인을 받지 않고 다른 회원의 개인정보를 수집, 저장, 유포, 게시',
  },
  {
    subNumbering: '8',
    subContents: '프로그램의 버그를 악용',
  },
  {
    subNumbering: '9',
    subContents:
      '회사 서비스 운영을 고의로 방해하거나 서비스의 안정적 운영을 방해할 수 있는 정보 및 수신자의 명시적인 수신거부 의사에 반하여 광고성 정보를 전송',
  },
  {
    subNumbering: '10',
    subContents:
      '타인으로 가장하는 행위 및 타인과의 관계를 허위로 명시',
  },
  {
    subNumbering: '11',
    subContents:
      '음란, 저속한 정보를 교류, 게재하거나 음란사이트를 연결(링크), 승인되지 않은 광고 및 홍보물 게재',
  },
  {
    subNumbering: '12',
    subContents:
      '재물을 걸고 도박하는 등 사행 행위를 유도하거나 참여하는 경우',
  },
  {
    subNumbering: '13',
    subContents:
      '수치심이나 혐오감 또는 공포심을 일으키는 말이나 음향, 글이나 화상 또는 영상을 상대방에게 전송, 도달, 유포',
  },
  {
    subNumbering: '14',
    subContents: '서비스에 게시된 정보를 변경하는 행위',
  },
  {
    subNumbering: '15',
    subContents:
      '관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터프로그램) 또는 컴퓨터소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 전송, 게시, 유포, 사용',
  },
  {
    subNumbering: '16',
    subContents:
      '회사의 직원이나 운영자를 가장하거나 사칭하여 또는 타인의 명의를 도용하여 글을 게시하거나 메일을 발송하는 행위',
  },
  {
    subNumbering: '17',
    subContents:
      '청소년보호법 제2조 제3호의 청소년유해매체물에 대하여 청소년유해매체물 표시를 하지 않고 게시하는 행위',
  },
  {
    subNumbering: '18',
    subContents:
      '기타 공공질서 및 미풍양속을 위반하거나 불법적, 부당한 행위 및 관계법령에 위배되는 행위',
  },
]

const Article16_3 = [
  {
    subNumbering: '1',
    subContents:
      '회원 가입 시 등록한 개인정보의 일부가 허위이거나 타인의 개인정보를 도용한 경우',
  },
  {
    subNumbering: '2',
    subContents:
      '회사가 법률에 근거하여 요청하는 정보의 제공을 거절할 경우',
  },
  {
    subNumbering: '3',
    subContents:
      '회사 플랫폼 내에서 타인에게 불쾌감을 주는 행위를 할 경우',
  },
  {
    subNumbering: '4',
    subContents: '원활한 서비스 운영을 방해하는 경우',
  },
  {
    subNumbering: '5',
    subContents:
      '회사가 허락하지 않은 프로그램의 사용 및 배포, 시스템의 버그이용, 해킹 또는 기타 시스템을 훼손시키려는 행위를 할 경우',
  },
  {
    subNumbering: '6',
    subContents:
      'ID 및 비밀번호의 유출로 인하여 제3자에 의한 부정 사용 등이 발생한 경우',
  },
  {
    subNumbering: '7',
    subContents:
      '본 약관 및 회사의 타 약관에 의해 ID 사용이 중지 또는 제한된 경우',
  },
]
const Article16_4 = [
  {
    subNumbering: '1',
    subContents: '회원 가입 시 등록한 개인정보의 전체가 허위인 경우',
  },
  {
    subNumbering: '2',
    subContents:
      '타인의 명의나 개인정보를 도용하여 서비스를 이용하는 경우',
  },
  {
    subNumbering: '3',
    subContents:
      '타인의 결제정보 등을 도용하거나 부정한 행위로 거래를 하는 경우',
  },
  {
    subNumbering: '4',
    subContents:
      '계정을 매매하거나 양도 또는 이를 유도하는 행위를 하는 경우',
  },
  {
    subNumbering: '5',
    subContents:
      '회사가 허락하지 않은 프로그램의 사용, 시스템의 버그이용, 해킹 또는 기타 시스템을 훼손시킨 경우',
  },
  {
    subNumbering: '6',
    subContents:
      '본 조 제3항에 해당하는 행위를 계속하여 회사로부터 2회 이상 서비스 이용 중지 또는 제한을 받은 경우',
  },
]
const Article16_12 = [
  {
    subNumbering: '1',
    subContents: '회원은 불쾌한 콘텐츠를 신고 할 수 있습니다.',
  },
  {
    subNumbering: '2',
    subContents:
      '회원은 불쾌한 콘텐츠를 게재하거나 또는 악의적인 사용자를 차단할 수 있습니다.',
  },
  {
    subNumbering: '3',
    subContents:
      '불쾌한 콘텐츠는 숨기기 기능을 이용하여 내 피드에 게시되지 않도록 방지할 수 있습니다.',
  },
  {
    subNumbering: '4',
    subContents:
      '회사는 불쾌한 콘텐츠를 제공한 사용자의 신고 및 차단횟수에 따라 해당 콘텐츠를 삭제하거나 계정사용정지 등 조치를 취할 수 있습니다.',
  },
]

const Article18_3 = [
  {
    subNumbering: '1',
    subContents: '여성가족부 청소년보호환경과 : 02-2100-6000',
  },
  {
    subNumbering: '2',
    subContents: '청소년 전화상담 헬프콜 : 1388',
  },
]
const Article18_4 = [
  { subContents: '이름: 서정원' },
  { subContents: '메일 : jungwonshu@hiblocks.io' },
]

export default TermsComponent
