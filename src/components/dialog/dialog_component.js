import React, { Component } from 'react'
import propTypes from 'prop-types'
let dialog_title_style={

}

class DialogTitle extends Component{
    render(){
        return (
            <div className='dialog-title' style={dialog_title_style}>
                <h1>{this.props.children}</h1>
            </div>
        )
    }
}
DialogTitle.prototype={
    'children':propTypes.string
}


let dialog_box_style={

}

class DialogInfo extends Component{
    render(){
        return (
            <div className='dialog-info' style={dialog_box_style}>
                {this.props.children}
            </div>
        )
    }
}

const dialog_buttons_style = {

}

class DialogButtons extends Component{
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return (
            <div className='dialog-info' style={dialog_Buttons_style}>
                {this.props.children}
            </div>
        )
    }
}


export {DialogTitle, DialogInfo, DialogButtons}