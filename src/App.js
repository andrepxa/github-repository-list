import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField } from '@material-ui/core'

import RepositoryList from './components/RepositoryList'

import './App.css'

const github = axios.create({
  baseURL: 'https://api.github.com',
  header: {
    Accept: "application/vnd.github.v3+json"
  }
})

function App () {
  const [username, setUsername] = useState('')
  const [repositories, setRepositories] = useState([])

  function fetchRepositories () {
    if (username) {

      github.get(`/users/${username}/repos`)
        .then(({ data }) => setRepositories(data))
    }
  }

  function onStarClick (repoName, repoUser) {
    console.log(repoName, repoUser)
  }

  useEffect(() => {
    if (repositories) {
      Promise.all(repositories.map(({ name, url, owner }) =>
        githubAuthenticated.get(`user/starred/${owner.login}/${name}`)
          .then(_ => ({ name, url, owner, starred: true }))
          .catch(_ => ({ name, url, owner, starred: false }))
      ))
    }
  }, [repositories])

  return (
    <div className="App App-header">
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
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
