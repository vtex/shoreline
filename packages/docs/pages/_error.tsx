import * as Sentry from '@sentry/nextjs'
import type { ErrorProps } from 'next/error'
import NextError from 'next/error'
import type { NextPageContext } from 'next'

const CustomErrorComponent = (props: ErrorProps) => {
  return <NextError statusCode={props.statusCode} />
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return NextError.getInitialProps(contextData)
}

export default CustomErrorComponent
