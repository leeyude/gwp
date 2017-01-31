import React from 'react';


export default RegCart = React.createClass({

  render(){
    return (
      <div>
        <div id="regCart">
          <div className="regCart-box clearfix">
            <div className="regCart-content">
              <div className="row">
                <div className="col-xs-8 col-sm-7 col-md-8">
                  <form className='cartForm'>
                    <div className='cartInfo'>
                      <div className='cartGreeting row'>
                        <div className='col-md-12'>
                          <i className="fa fa-opencart" aria-hidden="true"></i>
                          <h3>老闆，叫些什麼菜？</h3>
                          <div className='form-divider'>

                        </div>

                        </div>
                      </div>

                      <div className='cartBody'>
                        <div className='row'>
                          <div className='cartHeader col-md-12'>
                            <h3>菜車1</h3>
                            <div className='editCart'>
                              <i className="fa fa-file-text-o" aria-hidden="true"></i>

                            </div>

                            <div className='cartDaysRow'>
                              <div className='cartDaysTitle'>
                                送菜日：
                              </div>

                              <div className='cartDaysBlock'>
                                <div className='cartDay'>

                                </div>
                                <div className='cartDay'>

                                </div>
                                <div className='cartDay'>

                                </div>
                                <div className='cartDay'>

                                </div>
                                <div className='cartDay'>

                                </div>
                                <div className='cartDay'>

                                </div>
                                <div className='cartDay'>

                                </div>

                              </div>

                            </div>
                          </div>
                        </div>

                        <div className='row cartDetailRow'>
                          <div className='col-md-12'>
                            <div className='cartDetail'>
                              <div className='cartDetailTable table-responsive'>
                                <table className="table table-striped table-hover">
                                  <thead>

                                    <tr>
                                      <th>品項</th>
                                      <th>數量（KG）</th>
                                      <th>品級</th>

                                      <th>預算</th>
                                      <th>預估成交價</th>
                                      <th>預估節省</th>

                                      <th>預計到貨率</th>

                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>空心菜</td>
                                      <td>40</td>
                                      <td>優</td>

                                      <td>$40</td>
                                      <td>$31</td>
                                      <td>$9</td>
                                      <td>&gt;99%</td>

                                    </tr>
                                    <tr>
                                      <td>大白菜</td>
                                      <td>60</td>
                                      <td>優</td>

                                      <td>$45</td>
                                      <td>$28</td>
                                      <td>$17</td>
                                      <td>&gt;99%</td>

                                    </tr>
                                    <tr>
                                      <td>小白菜</td>
                                      <td>80</td>
                                      <td>優</td>

                                      <td>$60</td>
                                      <td>$30</td>
                                      <td>$30</td>
                                      <td>&gt;99%</td>

                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className='costThisCart clearfix'>
                                <div className='costThisCartSum'>
                                  $9,100
                                </div>
                                <div className='costThisCartTitle'>
                                  <h4>本車採購總額：</h4>
                                </div>

                              </div>

                              <div className='savingThisCart clearfix'>

                                <div className='savingThisCartSum'>
                                  $3,780
                                </div>

                                <div className='savingThisCartTitle'>
                                  <h4>本次節省總額：</h4>
                                </div>
                              </div>

                            </div>



                          </div>
                        </div>


                      </div>



                      <div className='row'>
                      </div>
                      <div className='row'>
                      </div>
                    </div>
                    <div className='additionalInfo'>
                      additional info
                    </div>
                  </form>
                </div>
                <div className="col-xs-4 col-sm-5 col-md-4">
                  right
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  }
});
