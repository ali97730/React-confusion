import React, { Component } from 'react' ;
import {Card,CardImg,CardText,CardBody,Breadcrumb,BreadcrumbItem,CardTitle,Label,Col,Row, Button,Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import { Loading } from './loadingComponent';
import { baseUrl } from '../shared/baseUrl';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


    class CommentForm extends Component{

        constructor (props){
            super(props);
            this.state={
              
                isModalOpen:false
            }
           
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
        
    
        }
        handleSubmit(values){
            this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
        }
    
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }
    

        render(){
            return(
                <div className="container">
                <div className="row">
                <Button outline onClick={this.toggleModal} className="mt-3" >
                     <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                </Button>
                </div>
                <div className="row">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="email" className="ml-3">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                       
                                         >
                                             <option value="1">1</option>
                                             <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        
                                            
                                             
                                         </Control.select>
                                   
                                </Col>
                            </Row>

                    <Row className="form-group">
                    <Label htmlFor="author" className="ml-3">Your Name</Label>
                    <Col md={12}>
                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />

                    </Col>
                    </Row>

                    <Row className="form-group">
                                <Label htmlFor="comment" className="ml-3">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                           
                                  
                                    
                    
                    </LocalForm>
                    </ModalBody>
                    </Modal>
                </div>
                </div>
            )
        }
                
        
    }


        function RenderDish({dish}){
            console.log(dish)
            if(dish != null){
            return (
               <Card>
                <CardImg width="100%" src ={baseUrl + dish.image} alt ={dish.name}/> 
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
               </CardBody>
            </Card>
            )}
            else{
                return(
                    <div>

                    </div>
                )
            }
        }
        function RenderComments({comments,addComment,dishId}){
            //console.log(allcomments)
            if(comments != null){
                const comment = comments.map((c)=> <li key={c.id}>{c.comment}<br/>
                                                                        {'--' + c.author}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</li>)
                  console.log(comment)
                return(
                    <div className="container">
                    <div>
                    <h4>Comments</h4>
                    <ul className="list-styled">
                    {comment}
                    </ul>
                    </div>
                    <div className="commentForm">
                    <CommentForm  dishId={dishId} addComment={addComment}/>
                    </div>
                    </div>
                )
                
                
            }
            else{
                return <div> </div>
            }

        }
  


    const DishDetail=(props)=>{
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                   <Loading/>        
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
            <h4>{props.errMess}</h4>        
                    </div>
                </div>
            );
        }
        if(props.dish != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                    </div>

                    
                </div>
                </div>
            );}
        else{
            return <div></div>
        }
    }
    


export default DishDetail;