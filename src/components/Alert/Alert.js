import React from 'react'

function Alert({message, theme}) {
    if (message && theme) {
        return (
            <div style={{backgroundColor: theme, width: '96%', padding: '10px', textAlign:'center', borderRadius: '8px'}}>
                <span>{message}</span>
            </div>
          )
    } else {

        return (
          <div className='alert-wrapper'>
          </div>
        )
    }
}

export default Alert