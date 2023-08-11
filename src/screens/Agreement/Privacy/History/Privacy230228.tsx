/* eslint-disable camelcase */
import HrScreen from '@components/Hr/HrScreen'
import { Colors, Layout } from '@constants'
import React from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SubContents from '../../components/SubContents'

const PrivacyComponent = ({
  scrollViewRef,
  setVersion,
}: {
  scrollViewRef: React.MutableRefObject<any>
  setVersion: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const _handelPressOldPrivcy = (version: number): void => {
    setVersion(() => version)
  }

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={{ paddingHorizontal: 15 }}
      >
        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제1조 총칙" />
        </View>
        <View style={{ marginBottom: 10 }}>
          <SubContents
            contents={`㈜하이블럭스(이하 "회사")는 정보통신서비스제공자가 준수하여야 할 관련 법령 상의 개인정보 보호 규정을 철저히 준수하며, ⌜개인정보 보호법⌟ 제 30조에 따라 개인정보 처리방침(이하, '본 처리방침')을 정하여 이용자 권익보호에 최선을 다하고 있습니다.`}
          />
          <SubContents
            contents={`“회사”의 개인정보처리방침은 개인정보보호와 관련한 법률 또는 지침의 변경, 회사 정책의 변화에 따라 변경될 수 있으므로, 고객께서는 회사 사이트 방문 시 수시로 확인하여 주시기 바랍니다.`}
          />
          <SubContents
            contents={`"회사"의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제2조 개인정보의 수집 및 이용목적" />
          <SubContents
            contents={`회사는 다음의 목적을 위해 이용자의 개인정보를 처리합니다. 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.`}
          />
          <SubContents
            numbering="⓵"
            contents="회원 관리 및 관리"
            subContents={Article2_1}
          />
          <SubContents
            numbering="⓶"
            contents="서비스 제공"
            subContents={Article2_2}
          />
          <SubContents
            numbering="⓷"
            contents="마케팅 및 광고에 활용"
            subContents={Article2_3}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제3조 처리하는 개인정보의 항목" />
          <SubContents
            contents={`회사는 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.`}
          />
          <SubContents
            contents={`회사는 다음과 같이 각 목적을 달성하기 위하여 필요한 최소한의 개인정보만을 수집하여 이용합니다.`}
          />
          <SubContents
            numbering="⓵"
            contents={`회원가입`}
            subContents={Article3_1}
          />
          <SubContents
            numbering="⓶"
            contents={`서비스 이용`}
            subContents={Article3_2}
          />
          <SubContents
            numbering="⓷"
            contents={`마케팅 정보 안내`}
            subContents={[
              {
                subNumbering: '·',
                subContents: '(선택) 이메일 주소',
              },
            ]}
          />
          <SubContents
            numbering="⓸"
            contents={`이메일 문의`}
            subContents={[
              {
                subNumbering: '·',
                subContents: `이메일 주소, 기기정보(OS), 하블 APP 버전정보, 문의내용에 포함된 개인정보`,
              },
            ]}
          />
          <SubContents
            numbering="⓹"
            contents={`KYC 인증`}
            subContents={Article3_5}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제4조 제3자로부터 제공받는 개인정보" />
          <SubContents
            contents={`회사는 제3자로부터 회원에 대한 정보를 제공받을 수 있습니다. 앱 개발자 및 퍼블리셔(이하 “파트너”)는 이들이 사용하는 서비스 로그인, 회사 API와 SDK를 통해 회사로 정보를 제공할 수 있습니다. 이 파트너들은 회원의 서비스 계정 보유 여부 또는 서비스 로그인 여부와 관계없이 서비스 밖에서의 회원의 활동에 대한 정보를 제공합니다.회사는 제3자로부터 개인정보를 제공받을 당시 해당 제3자가 회원으로부터 개인정보를 최초 수집할 당시 동의를 받은 목적(동의가 요구되지 않는 예외적인 경우에는 수집한 목적) 범위 내에서만 제공받은 회원의 개인정보를 이용합니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제5조 개인정보의 수집방법" />
          <SubContents
            contents={`“회사”는 다음과 같은 방법으로 개인정보를 수집합니다.`}
          />
          <SubContents
            numbering="-"
            contents={`홈페이지, 휴대폰 어플리케이션, 휴대폰 웹페이지, 팩스, 전화, 상담 게시판, 이메일, 이벤트 응모`}
          />
          <SubContents
            numbering="-"
            contents={`생성정보 수집 툴을 통한 수집`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제6조 개인정보의 제3자 제공에 관한 사항" />
          <SubContents
            contents={`이용자의 개인정보는 아래의 내용과 같이 공유되거나 제3자에 대해 제공 될 수 있습니다.`}
          />
          <SubContents
            numbering="⓵"
            contents={`서비스 내에서 공유`}
            subContents={[
              {
                subContents: `회원이 공유하고 커뮤니케이션하는 회원은 서비스 내에서 컨텐츠를 공유하거나 다른 사람과 커뮤니케이션할 때 할 수 있으며 이때 상대방은 회원의 콘텐츠 및 서비스내의 활동을 볼 수 있습니다. 여기에는 사용자 이름, 프로필에 있는 정보, 서비스에 게시한 콘텐츠 및 댓글 등이 포함됩니다.`,
              },
            ]}
          />
          <SubContents
            numbering="⓶"
            contents={`다른 사람이 회원과 공유하거나 다시 공유한 콘텐츠`}
            subContents={[
              {
                subContents: `서비스에서 회원이 다른 사람들과 콘텐츠를 공유 할 때, 상대방은 콘텐츠를 다운로드하거나 스크린샷으로 캡처하거나 서비스 안팎으로 다른 사람과 다시 공유할 수 있습니다. 또한 다른 사람의 게시물에 댓글을 달거나 보팅 할 때, 그 사람의 콘텐츠를 보는 사람은 회원의 댓글이나 보팅 내역을 볼 수 있습니다. 또한 다른 사람들은 서비스를 이용하여 회원에 관한 콘텐츠를 만들어 공유할 수도 있습니다. 예를 들어 게시물에 회원의 콘텐츠를 공유하고, 게시물에 회원의 위치를 언급하거나 태그하고, 게시물 또는 메시지에 회원에 대한 정보를 공유할 수 있습니다. 다른 사람들이 서비스에서 회원에 대해 공유한 내용에 불편함을 느낀다면 콘텐츠를 신고할 수 있습니다.`,
              },
            ]}
          />
          <SubContents
            numbering="⓷"
            contents={`제3자에 대한 개인정보 제공`}
            subContents={Article6_3}
          />
          <View style={{ paddingHorizontal: 30 }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color: Colors.nagative,
                }}
              >
                -
              </Text>
              <Text
                style={{ fontSize: 10, color: Colors.nagative }}
              >{`회원에게 본 서비스를 통하여 특별한 제안을 하기 위한 회사의 사업 파트너`}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color: Colors.nagative,
                }}
              >
                -
              </Text>
              <Text
                style={{ fontSize: 10, color: Colors.nagative }}
              >{`회사가 회원과 체결한 계약의 이행을 위하여 회원이 제공하는 정보를 저장하는 클라우드 저장 서비스 제공업체 및 회사의 정보 센터 및 호스트 제공업체`}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color: Colors.nagative,
                }}
              >
                -
              </Text>
              <Text
                style={{ fontSize: 10, color: Colors.nagative }}
              >{`본 서비스의 최적화 및 개선을 돕는 분석업체 및 검색 엔진 제공 업체, IT 서비스 제공업체, 고객 응대 서비스 제공 업체`}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 10,
                  marginRight: 5,
                  color: Colors.nagative,
                }}
              >
                -
              </Text>
              <Text
                style={{ fontSize: 10, color: Colors.nagative }}
              >{`회원이 회사의 서비스를 이용하거나 서비스에 통합된 제3자 앱, 웹사이트 또는 기타 서비스를 이용하고 회원이 공유를 선택할 경우 회원이 이용하는 서비스를 제공하는 제3자 파트너`}</Text>
            </View>
          </View>
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제7조 개인정보 위탁 및 개인정보의 국외이전" />
          <SubContents
            numbering="1."
            contents={`개인정보처리 국내 수탁업체 회사는 서비스제공에 있어 필요한 업무 중 일부를 외부업체가 수행하도록 개인정보의 처리를 위탁하고 있습니다. 그리고 위탁받은 업체가 관계법령을 위반하지 않도록 관리,감독합니다.`}
          />
          <View style={{ marginTop: 10 }}>
            <SubContents contents={`[지갑 솔루션 업무]`} />
            <SubContents
              numbering="-"
              contents={`수탁자 : 주식회사 해치랩스`}
            />
            <SubContents
              numbering="-"
              contents={`위탁업무 : 가상자산 지갑 연동 서비스`}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <SubContents
              numbering="2."
              contents={`개인정보처리 국외 수탁업체`}
            />
            <SubContents
              contents={`회사는 서비스제공에 있어 필요업무 중 일부를 국외에 있는 외부업체가 수행하도록 처리를 위탁하며, 수탁업체가 관계법령을 위반하지 않도록 관리감독합니다.`}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <SubContents
              numbering="⓵"
              contents="수탁업체 : plivo"
              subContents={Article7_1}
            />
            <SubContents
              numbering="⓶"
              contents="수탁업체 : Sendinblue"
              subContents={Article7_2}
            />
            <SubContents
              numbering="⓷"
              contents="수탁업체 : SendBird"
              subContents={Article7_3}
            />
            <SubContents
              numbering="⓸"
              contents="수탁업체 : Google Cloud Platform"
              subContents={Article7_4}
            />
          </View>
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제8조 서비스 및 계열사가 협력하는 방식" />
          <SubContents
            contents={`회사는 회원이 사용하는 회사 및 관계사의 서비스에서 혁신적이고 관련성이 있으며 일관적이고 안전한 환경을 제공하기 위해 인프라, 시스템 및 기술을 공유합니다. 또한 이러한 목적을 위해, 관련 법률에서 허용하는 경우에 회사 및 관계사의 약관 및 정책에 따라 해당 관계사에서 회원에 대한 정보를 처리합니다. 또한 회사는 회사 및 관계사의 서비스의 고유 사용자 수를 파악하는 등 사람들이 회사 및 관계사 서비스를 이용하고 상호 작용하는 방법을 파악하기 위해 노력하고 있습니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제9조 회원의 권리" />
          <SubContents
            contents={`아래에서 설명하는 권리를 사용하려면 team@hiblocks.io로 이메일을 보내 언제든지 문의하십시오. 회사는 회원의 요청 접수 후 1개월 이내에 요청을 처리할 것입니다. 단 요청의 복잡성으로 인해 최대 3 개월까지 연장될 수 있으며, 법령이나 정당한 동등 사유가 존재할 경우 회원의 요청을 거절할 수 있습니다.`}
          />
          <View style={{ marginTop: 15 }}>
            <SubContents
              contents={`정보 엑세스, 수정, 복사 및 삭제. 회원 또는 회원의 법적 대리인은 회사가 회원의 개인 정보를 수집, 사용 및 공유하는 것과 관련하여 다음 권리를 행사할 수 있습니다.`}
            />
          </View>
          <SubContents
            numbering="-"
            contents={` 개인 정보에 접근하기 위한 권리 행사`}
          />
          <SubContents numbering="-" contents={`수정 또는 삭제`} />
          <SubContents
            numbering="-"
            contents={`개인 정보의 처리를 일시적으로 중단`}
          />
          <SubContents
            numbering="-"
            contents={`전에 제공된 동의 철회`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제10조 개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항" />
          <SubContents
            numbering="⓵"
            contents={`회사는 회원에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.`}
          />
          <SubContents
            numbering="⓶"
            contents={`쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 회원의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.`}
          />
          <SubContents
            numbering="⓷"
            contents={`회사가 회원의 기기로부터 수집하는 정보는 다음과 같습니다.`}
            subContents={Article10_3}
          />
          <SubContents
            numbering="⓸"
            contents={`쿠키는 회원이 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 회원에게 최적화된 정보 제공을 위해 사용됩니다.`}
          />
          <SubContents
            numbering="⓹"
            contents={`쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.`}
          />
          <SubContents
            numbering="⓺"
            contents={`쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제11조 개인정보의 안전성 확보 조치" />
          <SubContents
            contents={`회사는 개인정보보호법 안전성 확보조치에 필요한 다음의 사항을 시행하고 있습니다.`}
          />
          <View style={{ marginTop: 15 }}>
            <SubContents boldcontents={`1. 관리적 보호대책`} />
            <SubContents
              numbering="⓵"
              contents={`내부관리계획의 수립 시행`}
              subContents={Article11_1}
            />
            <SubContents
              numbering="⓶"
              contents={`정기적인 자체 감사 실시`}
              subContents={Article11_2}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <SubContents boldcontents={`2. 기술적 보호대책`} />
            <SubContents
              numbering="⓵"
              contents={`개인정보취급자의 고객정보의 유출을 방지하기 위하여, 개인정보 유출방지 시스템을 운영하고 있으며, 단말기(PC) 및 네트워크 상의 전송되는 개인정보는 안전한 암호 알고리즘을 적용하고 있습니다.`}
            />
            <SubContents
              numbering="⓶"
              contents={`개인정보처리시스템에 대한 접근권한을 업무 수행에 필요한 최소한의 범위로 하여, 업무 담당자 별로 한 개의 사용자 계정을 차등 부여하고 있으며, 개인정보취급자가 변경되었을 경우 개인정보시스템의 접근권한을 변경 또는 말소하고 그 기록을 보관합니다. 또한, 개인정보취급자의 비밀번호 작성규칙을 수립하여 적용하고 있습니다.`}
            />
            <SubContents
              numbering="⓷"
              contents={`개인의 고유식별정보, 비밀번호를 정보통신망을 통하여 송•수신하거나 보조저장매체 등을 통하여 전달하는 경우에는 이를 상용 암호화 소프트웨어를 사용하여 저장하고 있으며, 비밀번호는 안전한 암호알고리즘으로 암호화하여 저장합니다.`}
            />
            <SubContents
              numbering="⓸"
              contents={`개인정보취급자가 개인정보처리시스템에 접속한 기록을 보관·관리하며, 개인정보취급자의 접속기록이 위•변조 및 도난, 분실되지 않도록 해당 접속기록을 안전하게 보관하고 있습니다.`}
            />
            <SubContents
              numbering="⓹"
              contents={`개인정보처리시스템 또는 업무용 컴퓨터에 악성 프로그램 등을 방지•치료 할 수 있는 백신 소프트웨어 등의 보안 프로그램을 설치•운영하고 있으며, 보안 프로그램의 자동 업데이트 기능을 사용하고, 주기적인 단말기(PC) 검사를 실시하고 있습니다.`}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <SubContents boldcontents={`3. 물리적 보호대책`} />
            <SubContents
              contents={`전산실, 자료보관실 등 개인정보를 보관하고 있는 물리적 보관 장소에 대한 출입통제 절차를 수립 운영하고 있으며, 개인정보가 포함된 서류, 보조저장매체 등을 잠금 장치가 있는 안전한 장소에 보관 및 관리하고 있습니다.`}
            />
          </View>
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제12조 법적 요청에 대한 대응과 피해 방지" />
          <SubContents
            contents={`회사는 회원의 정보에 접근하고 이를 보존하며 규제 당국, 사법당국 등으로부터 다른 법령에 따라 정당한 요구를 받은 경우 필요 최소한의 한도에서 해당 정보를 제공할 수 있습니다.`}
          />
          <SubContents
            contents={`법적인 요청(예: 수색 영장, 법원 명령서, 소환장 등)이 수반되고 법의 집행을 위해 필요하다고 판단될 경우. 여기에는 미국 외 지역 관할권에서의 법적 요청이 수반되고, 해당 관할권의 법에 의해 필요성이 인정되며, 그 지역 내의 사용자들에게 영향을 미침과 동시에 국제적으로 용인되는 기준에 부합한다고 판단될 때 해당 관할권의 요청을 받아들이는 경우가 포함됩니다.`}
          />
          <SubContents
            contents={`서비스가 필요성을 인정할 경우 사기, 제품의 권한 없는 사용, 약관 또는 정책 위반, 또는 기타 유해하거나 불법적인 활동을 감지 및 예방하고 이에 대처하는 조치, 조사 또는 규제 요구를 포함하여 서비스(권리, 자산 또는 제품), 회원 또는 다른 사람을 보호하기 위한 조치, 생명을 보호하고 상해를 막기 위한 조치가 필요합니다. 예를 들어 관련성이 있는 경우 서비스는 제품의 사기, 남용 및 기타 유해한 활동을 방지하기 위해 계정의 신뢰성에 대한 정보를 제3자 파트너와 주고받습니다.`}
          />
          <SubContents
            contents={`서비스를 이용한 구매 활동과 관련된 금융 거래 데이터를 포함해 서비스가 수집하는 회원의 정보는 법적인 요청이나 의무, 정부 조사, 서비스 약관과 정책에 대한 잠재적 위반에 대한 조사의 대상이 되는 경우 또는 다른 피해를 방지하기 위한 목적으로 장기간 액세스 및 보관될 수 있습니다. 또한 약관 악용 사례 또는 기타 약관에 대한 위반 행위의 반복을 막기 위해 약관 위반으로 비활성화된 계정의 정보를 최소 1년 이상 보존합니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제13조 개인정보의 보유, 이용기간 및 파기" />
          <View style={{ marginTop: 5 }}>
            <SubContents
              boldcontents={`1. 개인정보 보유 및 이용기간`}
            />
            <SubContents
              numbering="⓵"
              contents={`고객의 개인정보는 “회사”가 고객에게 서비스를 제공하는 기간 동안에 보유 및 이용됩니다. 회원 탈퇴 시 수집된 개인의 정보가 열람 또는 이용될 수 없도록 파기 처리됩니다. 다만, 관계법령의 규정에 의하여 보존할 필요성이 있는 경우에는 다음 관계법령에 따라 보존합니다.`}
              subContents={Article13_1}
            />
            <SubContents
              numbering="⓶"
              contents={`고객의 동의를 받아 보유하고 있는 거래정보에 대해 고객께서 열람을 요구하는 경우에는 지체없이 그 열람•확인할 수 있도록 조치합니다.`}
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <SubContents
              boldcontents={`2. 개인정보의 파기 절차 및 방법`}
            />
            <SubContents
              contents={`회사는 수집한 개인정보의 이용목적이 달성된 후에는 보관기간 및 이용기간에 따라 해당 정보를 지체없이 파기 또는 별도 분리 보관 합니다. 그 절차, 시점, 방법은 다음과 같습니다.`}
            />
            <SubContents
              numbering="⓵"
              contents={`파기절차 및 시점`}
              subContents={[
                {
                  subContents: `고객이 서비스 가입 등을 위해 기재한 개인정보는 서비스 해지 등 이용목적이 달성된 후 내부 방침 및 기타 관련 법령에 의한 정보보호 사유(위 개인정보의 보유 및 이용기간 참조)에 따른 보유기간이 경과한 후에 즉시 파기합니다. 일반적으로 잔존하는 채권-채무 관계가 없는 경우 “회사” 회원가입시 수집되어 전자적 파일형태로 관리하는 개인정보는 회원 탈퇴 시점에 바로 삭제 됩니다.`,
                },
              ]}
            />
            <SubContents
              numbering="⓶"
              contents={`파기방법`}
              subContents={[
                {
                  subContents: `종이에 출력된 개인정보는 분쇄기로 분쇄 또는 소각하거나 화학약품 처리를 하여 용해하여 파기하고, 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.`,
                },
              ]}
            />
            <SubContents
              numbering="⓷"
              contents={`분리 보관 시점 및 방법`}
              subContents={[
                {
                  subContents: `‘개인정보 유효기간제’ 에 따라 1년간 서비스를 이용하지 않은 경우, 해당 이용자의 계정은 휴면상태로 전환됩니다. 휴면상태 회원의 개인정보는 별도 분리하여 보관되며, 접근 제한 및 보안적용하여 관리 됩니다.`,
                },
              ]}
            />
          </View>
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제14조 개인 정보 보호 정책의 변경 안내" />
          <SubContents
            contents={`회사는 본 정책이 변경되는 경우, 본 서비스 상의 공지사항을 통하여 변경사항을 모든 회원에게 일반적으로 통지할 것입니다. 하지만 회원은 정기적으로 본 방침을 조회하여 변경사항을 확인하여야 합니다. 또한 회사는 본 방침의 발효일을 기재한 “최신 업데이트” 일자를 본 방침의 상단에 업데이트할 것입니다. 회원이 업데이트된 정책의 업데이트 일자 이후에도 계속하여 본 서비스에 접속 또는 이용하는 경우, 업데이트된 방침을 수용하는 것으로 간주됩니다. 회원이 업데이트된 방침에 동의하지 않는 경우, 본 서비스의 접속 또는 이용을 중단하여야 합니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제15조 개인정보보호 책임자 및 담당자" />
          <SubContents
            numbering="1."
            contents={`회사는 고객의 개인정보보호를 매우 소중하게 생각하며, 고객의 개인정보가 훼손, 침해 또는 누설되지 않도록 최선을 다하고 있습니다. 그러나 기술적인 보완조치를 했음에도 불구하고, 해킹 등 기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한 정보의 훼손 및 방문자가 작성한 게시물에 의한 각종 분쟁에 관해서는 책임이 없습니다.`}
          />
          <View style={{ marginTop: 10 }}>
            <SubContents
              numbering="2."
              contents={`고객의 개인정보보호 관련 문의 시 고객센터에서 신속하고 성실하게 답변을 드리도록 하고 있습니다. 또한 고객이 회사의 개인정보 보호담당자와 연락을 원하실 경우 아래의 연락처 또는 이메일로 연락을 주시면 개인정보 관련 문의사항에 대하여 신속하고 성실하게 답변해 드리겠습니다.`}
            />
            <SubContents
              numbering="⓵"
              contents={`개인정보 보호책임자`}
              subContents={Article15_1}
            />
            <SubContents
              numbering="⓶"
              contents={`개인정보 보호담당자`}
              subContents={Article15_2}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <SubContents
              numbering="3."
              contents={`기타 개인정보 침해로 인해 구제를 받기 위한 상담이 필요한 경우에는 개인정보 분쟁조정위원회, 대검찰청, 경찰청, 한국인터넷진흥원 등으로 문의하실 수 있습니다.`}
            />
            <SubContents
              numbering="⓵"
              contents={`개인정보분쟁조정위원회(Https://www.kopico.go.kr): 1833-6972`}
            />
            <SubContents
              numbering="⓶"
              contents={`대검찰청 사이버범죄수사단(https://www.spo.go.kr): 1301`}
            />
            <SubContents
              numbering="⓷"
              contents={`경찰청 사이버안전국(https://ecm.police.go.kr): 182`}
            />
            <SubContents
              numbering="⓸"
              contents={`개인정보 침해신고센터(https://privacy.kisa.or.kr): 118`}
            />
          </View>
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제16조 개인정보처리방침 변경시 고지 의무" />
          <SubContents
            contents={`개인정보처리방침 내용에 변경이 있을 경우 개정 최소 7일전에 알려드리나 회원의 권리에 중대한 변경이 발생할 때에는 최소 30일전에 알려드립니다.`}
          />
          <SubContents
            contents={`정부의 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 경우에는 변경사항의 시행 7일 전부터 홈페이지의 '공지사항'을 통해 고지할 것입니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: 10 }}>
          <SubContents boldcontents="제17조 링크사이트에 대한 책임" />
          <SubContents
            contents={`회사는 이용자에게 다른 외부사이트로 연결되는 링크를 제공할 수 있습니다. 이 경우 회사는 외부사이트에 대한 통제권이 없으므로 이용자가 외부사이트로부터 제공받는 서비스나 자료의 유용성, 진실성, 적법성에 대해 책임 및 보증할 수 없으며, 링크된 외부사이트의 개인정보처리방침은 회사와 무관하므로 해당 외부사이트의 정책을 확인하기 바랍니다.`}
          />
        </View>

        <HrScreen />

        <View style={{ marginBottom: Layout.headerHeight * 2 }}>
          <SubContents boldcontents="부칙" />
          <SubContents
            contents={`1. 본 개인정보처리방침은 2023년 02월 28일 부터 시행됩니다.`}
          />
          <SubContents
            contents={`이전 버전의 개인정보 처리방침은 아래에서 확인할 수 있습니다.`}
          />
          <TouchableOpacity
            onPress={(): void => _handelPressOldPrivcy(221228)}
          >
            <SubContents
              underlinecontents={`22. 12. 28.자 개인정보 처리방침`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(): void => _handelPressOldPrivcy(221205)}
          >
            <SubContents
              underlinecontents={`22. 12. 05.자 개인정보 처리방침`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(): void => _handelPressOldPrivcy(200716)}
          >
            <SubContents
              underlinecontents={`20. 07. 16.자 개인정보 처리방침`}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const Article2_1 = [
  {
    subNumbering: '-',
    subContents: '회원제 서비스 이용에 따른 본인확인, 개인식별',
  },
  {
    subNumbering: '-',
    subContents: '불량회원의 부정이용 방지와 비인가 사용 방지',
  },
  {
    subNumbering: '-',
    subContents: '가입의사 확인, 가입 및 가입횟수 제한',
  },
  {
    subNumbering: '-',
    subContents: '서비스 제공, 맞춤화, 개선 및 새로운 서비스 개발',
  },
  {
    subNumbering: '-',
    subContents:
      '고객상담, 고객불만 접수 및 처리, 분쟁조정을 위한 기록보존',
  },
  {
    subNumbering: '-',
    subContents: '공지사항 전달',
  },
]
const Article2_2 = [
  {
    subNumbering: '-',
    subContents: '서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공',
  },
  {
    subNumbering: '-',
    subContents:
      '약관 및 방침 시행, 제공하는 제품 또는 서비스에 대한 변경사항 통지',
  },
  {
    subNumbering: '-',
    subContents: '회원간 프로필, 게시한 콘텐츠 등 서로의 정보를 확인',
  },
  {
    subNumbering: '-',
    subContents:
      '법률, 법적 절차, 법 집행, 국가 안보 또는 공적 중요성의 문제 발생시 정보 공개',
  },
]
const Article2_3 = [
  {
    subNumbering: '-',
    subContents: '고객에게 최적화된 서비스 제공',
  },
  {
    subNumbering: '-',
    subContents: '웹페이지 접속 빈도 파악',
  },
  {
    subNumbering: '-',
    subContents: '서비스 이용에 대한 통계',
  },
  {
    subNumbering: '-',
    subContents: '고객 관심사에 부합하는 웹서비스 및 이벤트 기획',
  },
  {
    subNumbering: '-',
    subContents: '경품행사, 이벤트, 회사소식 등 광고성 정보 전달',
  },
]
const Article3_1 = [
  {
    subNumbering: '·',
    subContents:
      '회원가입: 이메일 주소, 비밀번호, 생년월일, 계정ID, 기기정보',
  },
  {
    subNumbering: '·',
    subContents:
      'SNS 간편회원가입:\n- 카카오: 카카오계정(이메일), 프로필 정보(닉네임, 프로필사진) (확인 후 파기)\n- 애플: 이메일, 이름(확인 후 파기)\n- 구글: 이메일 주소',
  },
]
const Article3_2 = [
  {
    subNumbering: '·',
    subContents:
      '필수항목: 디지털자산 주소 등 암호화페 전송/수신에 관한 정보, 마지막 이용 시간',
  },
  {
    subNumbering: '·',
    subContents: '선택항목: 관심분야',
  },
]
const Article3_5 = [
  {
    subNumbering: '·',
    subContents:
      '내국인: 국가정보, 이름, 영문이름, 주민등록번호, 성별, 통신사, 휴대전화번호, 연계정보(CI), 중복가입확인정보(DI), 신분증 사본(주민등록증, 자동차운전면허증, 여권), 신분증 발급일자, 자동차운전면허번호, 생년월일, 여권번호, 여권발급일자, 여권만료일자, 거주지 주소, 예금주, 은행명, 계좌번호, PIN번호, 얼굴사진',
  },
  {
    subNumbering: '·',
    subContents:
      '외국인: 국가정보, 이름, 휴대폰번호, 자택주소, 생년월일, 성별, 신분증 사본(여권, ID카드), 얼굴사진, 거주지증명서',
  },
]
const Article6_3 = [
  {
    subNumbering: '⓵',
    subContents: `회사는 회원의 동의, 법률상 특별한 규정이 있거나 법령상 의무를 준수하기 위해 불가피한 경우 등 개인정보보호법 제17조(개인정보 제공) 및 제18조(개인정보 목적 외 이용, 제공 제한)에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.`,
  },
  {
    subNumbering: '⓶',
    subContents: `회사는 서비스의 제공 및 개선을 지원하거나 서비스 로그인, 회사 API등을 사용하는 제3자 파트너에게 회원의 사전 동의 하에 회원의 정보를 제공할 수 있습니다. 이는 무료 서비스로 회사는 회원의 정보를 누구에게도 판매하지 않을 것입니다. 회사는 또한 회사 파트너들이 회사에서 제공한 데이터를 이용하고 공개하는 방법에 엄격한 제한을 가하고 있습니다.`,
  },
  {
    subNumbering: '⓷',
    subContents: `회사가 정보를 공유하는 제3자의 유형은 다음과 같습니다.`,
  },
]
const Article7_1 = [
  {
    subNumbering: '-',
    subContents: `위탁목적: 휴대폰, SMS/MMS 전송`,
  },
  {
    subNumbering: '-',
    subContents: `위탁항목: 휴대폰번호`,
  },
  {
    subNumbering: '-',
    subContents: `위탁국가,연락처: 미국, legalrequest@plivo.com`,
  },
  {
    subNumbering: '-',
    subContents: `위탁일시,방법: 서비스 이용시마다 네트워크를 통해 전송`,
  },
  {
    subNumbering: '-',
    subContents: `보유,이용기간: 이용 해잊 후 7년`,
  },
]
const Article7_2 = [
  {
    subNumbering: '-',
    subContents: `위탁목적: 사용자 DM 전송`,
  },
  {
    subNumbering: '-',
    subContents: `위탁항목: 사용자 아이디`,
  },
  {
    subNumbering: '-',
    subContents: `위탁국가,연락처: 미국, support@sendinblue.com`,
  },
  {
    subNumbering: '-',
    subContents: `위탁일시,방법: 서비스 이용시마다 네트워크를 통해 전송`,
  },
  {
    subNumbering: '-',
    subContents: `보유,이용기간: 이용 해지 후 5년`,
  },
]
const Article7_3 = [
  {
    subNumbering: '-',
    subContents: `위탁목적: 메일 전송`,
  },
  {
    subNumbering: '-',
    subContents: `위탁항목: 메일주소`,
  },
  {
    subNumbering: '-',
    subContents: `위탁국가,연락처: 미국, contact@sendbird.com`,
  },
  {
    subNumbering: '-',
    subContents: `위탁일시,방법: 서비스 이용시마다 네트워크를 통해 전송`,
  },
  {
    subNumbering: '-',
    subContents: `보유,이용기간: 이용 해지 후 3년`,
  },
]
const Article7_4 = [
  {
    subNumbering: '-',
    subContents: `위탁목적: Cloud 서비스 이용`,
  },
  {
    subNumbering: '-',
    subContents: `위탁항목: 회원가입 의사표시 단계에서 수집하는 개인정보, 신원확인 업무 시 수집하는 개인정보`,
  },
  {
    subNumbering: '-',
    subContents: `위탁국가,연락처: 미국, 영업팀: 080-7882-585`,
  },
  {
    subNumbering: '-',
    subContents: `위탁일시,방법: 미국/서비스 이용시마다 네트워크를 통해 전송`,
  },
  {
    subNumbering: '-',
    subContents: `보유,이용기간: 회원탈퇴시 혹은 위탁계약 종료시까지 서비스 운영을 위한 Cloud 서비스`,
  },
]
const Article10_3 = [
  {
    subNumbering: '-',
    subContents: `운영 체제, 하드웨어 및 소프트웨어 버전, 배터리 잔량, 신호 강도, 사용 가능한 저장 공간, 브라우저 유형, 앱 및 파일 이름 및 유형, 플러그인 등의 정보`,
  },
  {
    subNumbering: '-',
    subContents: `창이 전면 또는 백그라운드에 있는지 여부 등 기기에서 수행되는 작업 및 동작에 관한 정보, 고유 식별자, 기기 ID 및 기타 식별자`,
  },
  {
    subNumbering: '-',
    subContents: `Bluetooth 신호 및 근처 Wi-Fi 액세스 포인트, 셀 타워에 관한 정보`,
  },
  {
    subNumbering: '-',
    subContents: `카메라 또는 사진에 대한 액세스 등 회원의 기기 설정을 활성화하여 서비스가 수신할 수 있도록 허가한 정보`,
  },
  {
    subNumbering: '-',
    subContents: `이동통신사 또는 언어, 시간대, 휴대폰 번호, IP 주소, 연결 속도`,
  },
  {
    subNumbering: '-',
    subContents: `쿠키 ID 및 설정을 포함하여 기기에 저장된 쿠키 데이터`,
  },
]
const Article11_1 = [
  {
    subNumbering: '·',
    subContents: '개인정보보호책임자의 지정에 관한 사항',
  },
  {
    subNumbering: '·',
    subContents:
      '개인정보보호책임자 및 개인정보취급자의 역할 및 책임에 관한 사항',
  },
  {
    subNumbering: '·',
    subContents: '개인정보의 안전성 확보에 필요한 조치에 관한 사항',
  },
  {
    subNumbering: '·',
    subContents: '개인정보취급자 및 위탁업체에 대한 교육에 관한 사항',
  },
  {
    subNumbering: '·',
    subContents: '그 밖에 개인정보 보호를 위하여 필요한 사항',
  },
]
const Article11_2 = [
  {
    subNumbering: '·',
    subContents: '개인정보 보호책임자와 감사자의 직무분리 사항',
  },
  {
    subNumbering: '·',
    subContents: '개인정보 감사자의 역할 및 책임에 관한 사항',
  },
  {
    subNumbering: '·',
    subContents:
      '개인정보 취급 관련 안전성 확보를 위한 정기적 자체 감사',
  },
]
const Article13_1 = [
  {
    subNumbering: '1)',
    subContents:
      '계약 또는 청약철회 등에 관한 기록\n- 보존근거: 전자상거래 등에서의 소비자보호에 관한 법률\n- 보존기간: 5년',
  },
  {
    subNumbering: '2)',
    subContents:
      '소비자의 불만 또는 분쟁처리에 관한 기록\n- 보존근거: 전자상거래 등에서의 소비자보호에 관한 법률\n- 보존기간: 3년',
  },
  {
    subNumbering: '3)',
    subContents:
      '로그인 기록\n- 보존근거: 통신비밀보호법\n- 보존기간: 6개월',
  },
  {
    subNumbering: '4)',
    subContents:
      '고객 확인 자료\n- 보존근거: 특정 금융거래정보의 보고 및 이용 등에 관한 법률\n- 보존기간: 5년',
  },
]
const Article15_1 = [
  {
    subNumbering: '·',
    subContents: '성명: 길상훈',
  },
  {
    subNumbering: '·',
    subContents: '직위: 대표이사',
  },
  {
    subNumbering: '·',
    subContents: '전화번호: 070-8886-7788',
  },
  {
    subNumbering: '·',
    subContents: '이메일: cs@hiblocks.io',
  },
]
const Article15_2 = [
  {
    subNumbering: '·',
    subContents: '성명: 선경일',
  },
  {
    subNumbering: '·',
    subContents: '직위: 팀장',
  },
  {
    subNumbering: '·',
    subContents: '전화번호: 070-8886-7788',
  },
  {
    subNumbering: '·',
    subContents: '이메일: cs@hiblocks.io',
  },
]
export default PrivacyComponent
