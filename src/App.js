import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

import { github, githubAuthenticated } from './services/github'
import RepositoryList from './components/RepositoryList'

import './App.css'

function App () {
  const [user, setUser] = useState('')
  const [token, setToken] = useState('ad74eebd22d8304ca357344bdadb7cf273453d39')
  const [username, setUsername] = useState('')
  const [repositories, setRepositories] = useState([])

  const fetchRepositories = async () => {
    if (username) {
      let repos = await github.get(`/users/${username}/repos`)
        .then(({ data }) => data)

      if (!!user && !!token) {
        repos = await Promise.all(repos.map(({ name, html_url, owner }) =>
          githubAuthenticated({ user, token })
            .get(`user/starred/${owner.login}/${name}`)
            .then(_ => ({ name, html_url, owner, starred: true }))
            .catch(_ => ({ name, html_url, owner, starred: false }))
        ))
      }

      setRepositories(repos)
    }
  }

  const onStarClick = async repositoryIndex => {
    const { starred, owner, name } = repositories[repositoryIndex]

    if (starred) {
      await githubAuthenticated({ user, token }).delete(`user/starred/${owner.login}/${name}`)
    } else {
      await githubAuthenticated({ user, token }).post(`user/starred/${owner.login}/${name}`)
    }

    const newRepositories = [...repositories]
    newRepositories[repositoryIndex].starred = !starred
    setRepositories(newRepositories)
  }

  return (
    <div className="App App-header">
      <TextField
        value={user}
        onChange={e => setUser(e.target.value)}
        label="username"
        variant="outlined"
      />
      <TextField
        value={token}
        type="password"
        onChange={e => setToken(e.target.value)}
        helperText="A personal access token is required to star a repo with 'public_repo' scope"
        label="token"
        variant="outlined"
      />
      <br />
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
        label="username"
        helperText="Username to find repos"
      />
      <Button type="submit" onClick={fetchRepositories}>
        list repositories
      </Button>
      <RepositoryList
        repositories={repositories}
        onStarClick={onStarClick}
      />
    </div>
  )
}

export default App
