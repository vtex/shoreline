import fse from 'fs-extra'

interface OutputFileProps {
  path: string
  code: Buffer
  successMessage: string
}

export function outputFile(props: OutputFileProps) {
  const { path, code, successMessage } = props

  fse.outputFile(path, code, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(successMessage)
    }
  })
}
