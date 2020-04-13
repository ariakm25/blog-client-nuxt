export default function({ $auth, error }) {
  if (!$auth.hasScope('admin')) {
    return error({ statusCode: 403 })
  }
}
