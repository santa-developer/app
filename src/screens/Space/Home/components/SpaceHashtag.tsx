import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Body from '@components/Body'
import styled from 'styled-components/native'
import { Colors, Images } from '@constants'
import Text from '@components/Text'
import { getViewDateFromNow } from '@utils/timesUtils'
import IconHeart from '@components/Images/Icon/IconHeart'
import IconHate from '@components/Images/Icon/IconHate'
import IconShare from '@images/svg/IconShare.svg'
import Instargram from '@images/svg/Instargram.svg'
import IconMore from '@components/Images/Icon/IconMore'
import Hr from '@components/Hr'
import { StackNavigationOptions } from '@react-navigation/stack'
import { CommonHeader } from '@components/Header'

const text = `🐭생쥐, 똘기,떵이,호치,새초미 자축인묘
드라고,요롱이,마초,미미 진사오미
뭉키,치치,강다리,찡찡이 신유술해
우리들은 꾸러기 꾸러기 12가지 무슨동울 꾸러기 수비대~`

/**
 * 스페이스 해시태그 상세검색
 */
export default function SpaceHashtag(): JSX.Element {
  const [isCollapse, setIsCollapse] = useState(false)

  const handleCollapse = (): void => {
    setIsCollapse((is) => !is)
  }

  return (
    <Body scrollable hidePadding>
      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />

      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />
      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />
      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />
      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />
      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />
      <UserInfoContainer>
        <UserInfoWrap>
          <UserIconWrap>
            <UserIcon source={Images.png.profile} />
          </UserIconWrap>
          <View>
            <Text color={Colors.bl} size={16}>
              newjeanshaerina
            </Text>
            <Text color={Colors.active}>NewJeans.</Text>
          </View>
          <View style={{ marginTop: 3, marginLeft: 10 }}>
            <Text color={Colors.nagative} size={13}>
              {getViewDateFromNow(1688637828000)}
            </Text>
          </View>
        </UserInfoWrap>
        <TouchableOpacity activeOpacity={0.7}>
          <IconMore />
        </TouchableOpacity>
      </UserInfoContainer>
      <FeedContainer>
        <FeedImage></FeedImage>
        <FeddPageWrap>
          <Text color={Colors.wh}>1/2</Text>
        </FeddPageWrap>
      </FeedContainer>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconHeart />
          <Text color={Colors.disabled} style={{ marginLeft: 5 }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconHate />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconShare />
        </TouchableOpacity>
        <View>
          <Instargram />
        </View>
      </View>
      <FeedContentContainer isCollapse={isCollapse}>
        <FeedContentWrap>
          <Text>{text}</Text>
          <TouchableOpacity onPress={handleCollapse}>
            <Text color={Colors.active}>
              {isCollapse ? '접기' : '펼치기'}
            </Text>
          </TouchableOpacity>
        </FeedContentWrap>
        {isCollapse && (
          <>
            <TagContainer>
              <HashTag>#NewJeans #뉴진스</HashTag>
              <HashTag>#Jeans_Zine</HashTag>
            </TagContainer>

            <LikeText>{`${0}개의 좋아여를 받았습니다.`}</LikeText>

            <SourceContainer>
              <Instargram />
              <SourceText>
                {`출처 - ${'https://www.instagram.com'}\n제테크가 되는 소셜미디어?\n나. 이. 또 !!\n구글펠레이/앱스토에서asd`}
              </SourceText>
            </SourceContainer>
          </>
        )}
      </FeedContentContainer>
      <Hr />
      <CommentContainer>
        <View>
          <Text color={Colors.nagative}>댓글 35 모두 보기</Text>
        </View>
        <View>
          <MainComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </MainComment>
          <SubComment>
            <CommentUser bold="500">funky1119</CommentUser>
            <Comment>하하하하하하하</Comment>
          </SubComment>
        </View>
      </CommentContainer>
      <Hr
        style={{ marginTop: 10 }}
        borderWidth={4}
        borderColor="#F0F0F0"
      />
    </Body>
  )
}

SpaceHashtag.navigationOptions = (): StackNavigationOptions => {
  return CommonHeader({
    title: '해쉬태그 상세검색',
  })
}

const UserInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`
const UserInfoWrap = styled.View`
  flex-direction: row;
`
const UserIconWrap = styled.View`
  margin-right: 8px;
`
const UserIcon = styled.Image`
  width: 45px;
  height: 45px;
`
const FeedContainer = styled.View`
  width: 100%;
  height: 320px;
  background-color: yellow;
`
const FeedImage = styled.View``
const FeddPageWrap = styled.View`
  position: absolute;
  right: 10px;
  top: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 3px 10px;
  border-radius: 50px;
`

const FeedContentContainer = styled.View<{ isCollapse?: boolean }>`
  padding: 15px;
  height: ${(props): string => (props.isCollapse ? 'auto' : '74px')};
`
const FeedContentWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const TagContainer = styled.View`
  margin-top: 13px;
`
const HashTag = styled(Text)`
  color: ${Colors.hashtag};
`

const LikeText = styled(Text)`
  margin-top: 15px;
`

const SourceContainer = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  border: 1px solid ${Colors.active};
  margin: 8px 0;
  flex-direction: row;
  padding: 10px 20px 10px 10px;
  justify-content: space-between;
  border-radius: 5px;
`
const SourceText = styled(Text)`
  width: 85%;
  margin: 0 15px;
`

const CommentContainer = styled.TouchableOpacity`
  padding: 10px 15px;
`
const MainComment = styled.View`
  flex-direction: row;
  margin-top: 3px;
`
const SubComment = styled.View`
  flex-direction: row;
  margin-left: 30px;
  margin-top: 2px;
  margin-bottom: 5px;
`
const CommentUser = styled(Text)`
  margin-right: 15px;
`
const Comment = styled(Text)`
  color: ${Colors.nagative};
`
