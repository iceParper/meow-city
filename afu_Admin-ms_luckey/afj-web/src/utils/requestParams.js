const requestParams = (data) => {
  return {
    'head': {
      'managerUuid': localStorage.getItem('managerUuid'),
      'password': 'afu2020'
    },
    'body': data
  }
}

export default requestParams