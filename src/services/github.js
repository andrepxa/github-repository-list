import axios from 'axios'

export const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: "application/vnd.github.v3+json" }
})

const githubAuthenticated = ({ user, token }) =>
  axios.create({
    baseURL: 'https://api.github.com',
    auth: { username: user, password: token },
    headers: { Accept: "application/vnd.github.v3+json" }
  })

export const unstarRepository = ({ user, token, repoUser, repoName }) =>
  githubAuthenticated({ user, token })
    .delete(`user/starred/${repoUser}/${repoName}`)

export const starRepository = ({ user, token, repoUser, repoName }) =>
  githubAuthenticated({ user, token })
    .put(`user/starred/${repoUser}/${repoName}`)

export const getRepositoryStar = ({ user, token, repoUser, repoName }) =>
  githubAuthenticated({ user, token })
    .get(`user/starred/${repoUser}/${repoName}`)
