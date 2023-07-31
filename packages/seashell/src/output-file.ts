import fse from 'fs-extra'

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

interface OutputFileProps {
  path: string
  code: Buffer
  successMessage: string
}
