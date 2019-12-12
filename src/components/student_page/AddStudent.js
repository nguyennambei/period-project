import React from 'react';
import { firebaseApp } from '../firebaseConfig';

export default class AddStudent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idstudent:null,namestudent:null,namefuri:null,nickname:null,gender:null,age:null,country:null,phonenumber:null,address:null,image:null,url:null
        }
        this.database = firebaseApp.database().ref('student_data');
        this.storage = firebaseApp.storage();
    }
    handleChange = (e)=>{
        const target= e.target;
        if(target.type!=='file'){
            const name = target.name;
            console.log(name);
            const value = (name === 'namestudent') ? target.value.toUpperCase() : target.value;
            this.setState({[name]:value});
        } else {
            const image = target.files[0];
            this.setState({image});
        }
    }
    handleSubmit = (e)=>{
        const {idstudent,namestudent,namefuri,nickname,gender,age,country,phonenumber,address,image,url} = this.state;
        try {
            const uploadTask = this.storage.ref(`studentImg/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                ()=>{
                    this.storage
                        .ref("studentImg")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url=>{
                            this.setState({url})
                        });
                }
            );
            this.database.child(idstudent).set({
                idstudent:idstudent,namestudent:namestudent,namefuri:namefuri,
                nickname:nickname,gender:gender,age:age,country:country,phonenumber:phonenumber,
                address:address,imageurl:url
            },function(error) {
                if (error) {
                  // The write failed...
                  console.log('dsf',error)
    
                } else {
                  // Data saved successfully!
                }
            });
        } catch (error) {
                
        }
        
    }
    render() {
      return (
        <div className="card">
            <div className="card-header text-white bg-primary">
                学生情報を追加のフォーム
            </div>
            <div className="card-body">
                <form >
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">学生番号</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="idstudent" defaultValue={this.state.idstudent} onChange={this.handleChange}/>
                            <small></small>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">名前</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="namestudent" defaultValue={this.state.namestudent} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">フリガナ</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="namefuri" defaultValue={this.state.namefuri} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">呼び名前</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="nickname" defaultValue={this.state.nickname} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-ms">性別</label>
                        <div className="col-md-2">
                            <select className="form-control" name="gender" defaultValue={this.state.gender} onChange={this.handleChange}>
                                <option value="null">選択</option>
                                <option value={true}>男性</option>
                                <option value="false">女性</option>
                            </select>
                        </div>
                        <label className="col-md-2 col-form-label col-form-label-ms">生年</label>
                        <div className="col-md-2">
                            <input type="text" className="form-control form-control-md" name="age" defaultValue={this.state.age} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">国籍</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="country" defaultValue={this.state.country} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">電話番号</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="phonenumber" defaultValue={this.state.phonenumber} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">住所</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-md" name="address" defaultValue={this.state.address} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <label className="col-md-2 col-form-label col-form-label-md">学生写真</label>
                        <div className="col-md-6">
                              <input type="file" className="form-control-file" name="image" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <input type="submit" className="btn btn-primary" defaultValue="送信"/>
                    </div>
                </form>
                        <button onClick={this.handleSubmit}>gui</button>
            </div>
        </div>
      )
    };
}