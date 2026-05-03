export default (req, res) => res.redirect(302, process.env.TUNNEL_URL ?? '/')
