import axios from 'axios'

export const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: "application/vnd.github.v3+json" }
})

export const githubAuthenticated = ({ user, token }) => axios.create({
  baseURL: 'https://api.github.com',
  auth: { username: user, password: token },
  headers: {
    Accept: "application/vnd.github.v3+json",
    'Content-Length': '0'
  }
})
