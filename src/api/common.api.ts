import { Platform } from 'react-native'
import Share from 'react-native-share'
import $t, { getLocale } from 'i18n'
import { axiosGet, axiosPost } from '@api/manager'
import apiPath from './path'
import RESPONSE from '@models/Common/RESPONSE'
import CODE from '@models/Common/CODE'

const { code: codeApiPath, share: shareApiPath } = apiPath

const code = {
  listProc: {
    get: async (
      params: { grupCode: string[] },
      signal?: AbortSignal
      /// TODO
    ): Promise<RESPONSE<{ list: CODE[] }>> => {
      return axiosGet({
        path: codeApiPath.listProc,
        params,
        signal,
      })
    },
  },
}

const share = {
  shareLinkProc: {
    post: async (params: object): Promise<RESPONSE> => {
      return axiosPost({
        path: shareApiPath.getLink,
        params,
      })
    },
  },
}

async function buildShareLink({
  type,
  mgmtNmbr,
  thnl,
  message,
}: {
  type: string
  mgmtNmbr: string
  thnl: string
  message: string
}): Promise<string> {
  const locale = await getLocale()
  const result = await share.shareLinkProc.post({
    type,
    mgmtNmbr,
    thnl,
    locale,
    message,
  })

  let shareLink = ''
  if (result.check) {
    shareLink = result.response.shortLink
  }
  return shareLink
}

function shareTo({
  url,
  title,
  message,
  onSuccess,
  onError,
}: {
  url: string
  title: string
  message: string
  onSuccess?: () => void
  onError?: () => void
}): void {
  const shareOptions = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: {
            type: 'url',
            content: url,
          },
          item: {
            default: {
              type: 'url',
              content: url,
            },
          },
          subject: {
            default: title,
          },
          linkMetadata: {
            originalUrl: url,
            url,
            title,
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Share.open(shareOptions)
    .then(() => {
      onSuccess?.()
    })
    .catch(() => {
      //  error close
      onError?.()
    })
}

function spaceShareTo({
  spaceName,
  url,
  recommenderId,
}: {
  spaceName: string
  url: string
  recommenderId: string
}): void {
  const message = $t(
    'SPCE.SPCE_STC_35',
    spaceName,
    url,
    recommenderId
  )
  Share.open({
    message,
  })
}

export default {
  code,
  buildShareLink,
  shareTo,
  spaceShareTo,
}
