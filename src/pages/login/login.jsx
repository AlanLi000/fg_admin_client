import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'

import './login.less'
import logo from './images/logo.jpg'

class Login extends Component {

    handleSubmit = e => {
        // 阻止事件的默认行为: 阻止表单的提交
        e.preventDefault()

        // alert("发送登录ajac请求")
        // const form = this.props.form
        // const values = form.getFieldsValue()
        // const username = form.getFieldValue('username')
        // const pwd = form.getFieldValue('pwd')
        // console.log(values,username,pwd)

        this.props.form.validateFields(async (err, {username, pwd}) => {
            if (!err) {
              
                alert("发送登录ajac请求")
              
            } else {
              // alert('验证失败!')
            }
          })

      }

    validatePwd = (rule, value, callback) => {
        // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
        value = value.trim() //去空格
        if (!value) {
            callback('密码必须输入')
        } else if (value.length<4) {
            callback('密码不能小于4位')
        } else if (value.length>12) {
            callback('密码不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }
    }

  render() {


    // 读取保存的user, 如果存在, 直接跳转到管理界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    // const user = memoryUtils.user
    // if (user._id) {
    //   return <Redirect to="/" /> // 自动跳转到指定的路由路径
    // }

    const { getFieldDecorator } = this.props.form


    return (
        <div className='login'>

            <div className='login-header'>
                <img src={logo} alt='logo'></img>
                <h1>react实战项目: 后台管理系统</h1>
            </div>

            <div className='login-content'>
                <h1>用户登录</h1>

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {
                            getFieldDecorator('username', { // 配置对象: 属性名是一些特定的名称
                                initialValue: '', // 初始值
                                rules: [ 
                                    // 声明式验证: 使用插件已定义好的规则进行验证
                                    // 1).必须输入
                                    // 2). 必须大于等于4位
                                    // 3). 必须小于等于12位
                                    // 4). 必须是英文、数字或下划线组成
                                    { required: true, whitespace: true, message: '用户名是必须' },
                                    { min: 4, message: '用户名不能小于4位'},
                                    { max: 12, message: '用户名不能大于12位'},
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                                ]
                            })
                            (
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名" 
                                />
                            )
                        }
                    </Form.Item>

                    <Form.Item>
                    {
                        getFieldDecorator('pwd', {
                            initialValue: '', // 初始值
                            rules: [
                                { validator: this.validatePwd}
                            ]
                            })
                            (
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                            )
                     
                    }
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                    </Form.Item>

                </Form>
            </div>
                
        </div>
    )
  }
}

const WrapperForm = Form.create()(Login)

export default WrapperForm // <Form(Login)/>
