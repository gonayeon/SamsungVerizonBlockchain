const errorTypes = {
    "LOGIN_NON_ACTIVE" : "LOGIN_NON_ACTIVE",
    "EXPIRE_PASSWORD" : "EXPIRE_PASSWORD"
}

// ======= Modal On ===================================================================================================

// User management - User Add Modal
function userAddModalOn() {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="userAddModal">
             <div class="common-modal-style">
                
                <div class="modal-top">
                    <button type="button" class="modal-close-button">
                        <img src="/images/modal-close-mark.svg" alt="close modal button">
                    </button>
                </div>        
                
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>User Add</h3>
                    </div>
                    
                    <ul class="modal-input-wrap">
                        <li>
                            <h4>User Id</h4>
                            <input type="text" placeholder="Email address" id="userId" autocomplete="off">
                        </li>
                        
                        <li>
                            <h4>First Name</h4>
                            <input type="text" placeholder="First name" id="firstName" autocomplete="off">
                        </li>
                        
                        <li>
                            <h4>Last Name</h4>
                            <input type="text" placeholder="Last name" id="lastName" autocomplete="off"> 
                        </li>
                        
                        <li>
                            <h4>Role</h4>
                            <div class="modal-select-box">
                                <div class="modal-selected">
                                    <span id="role"></span>
                                </div>
                                <ul class="modal-options">`;

                    userRoles.forEach(userRole => {
                        html += `<li class="option">${userRole}</li>`
                    })

                    html +=     `</ul>
                            </div>
                        </li>
                    </ul>
                                        
                    <div class="modal-validation-guide">
                        <p id="error-message" class="error-guide-message"></p>    
                    </div>
                    <button type="button" class="common-btn-style-blue-deep common-button-frame" onclick="addUser();">Save</button>
                </div>
            </div>
        </div>`;

    modalArea.innerHTML= html;
    $('#userAddModal').show();

    // modal select event
    modalSelectOptionEvent("ADD");

    // modal Validation Condition Clear
    modalValidationConditionClear('#userAddModal input[type="text"]', '#userAddModal #error-message');

    // modal close
    modalCloseEvent('#userAddModal');
}

// User management - User edit Modal
function userEditModalOn(userId, firstName, lastName, role) {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="userEditModal">
             <div class="common-modal-style">
                
                <div class="modal-top">
                    <button type="button" class="modal-close-button">
                        <img src="/images/modal-close-mark.svg" alt="close modal button">
                    </button>
                </div>        
                
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>User Edit</h3>
                    </div>
                    
                    <ul class="modal-input-wrap">
                        <li>
                            <h4>User Id</h4>
                            <input type="text" id="userId" disabled value="${userId}">
                        </li>
                        
                        <li>
                            <h4>First Name</h4>
                            <input type="text" placeholder="First name" id="firstName" autocomplete="off" value="${firstName}">
                        </li>
                        
                        <li>
                            <h4>Last Name</h4>
                            <input type="text" placeholder="Last name" id="lastName" autocomplete="off" value="${lastName}"> 
                        </li>
                        
                        <li>
                            <h4>Role</h4>
                            <div class="modal-select-box">
                                <div class="modal-selected">
                                    <span id="role">${role}</span>
                                </div>
                                <ul class="modal-options">`;

                                userRoles.forEach(userRole => {
                                    html += `<li class="option">${userRole}</li>`
                                })

                            html +=  `</ul>
                                    </div>
                                </li>
                            </ul>
                                        
                    <div class="modal-validation-guide">
                        <p id="error-message" class="error-guide-message"></p>    
                    </div>
                    <button type="button" class="common-btn-style-blue-deep common-button-frame" onclick="editUser();">Save</button>
                </div>
            </div>
        </div>`;

    modalArea.innerHTML= html;
    $('#userEditModal').show();

    // modal select event
    modalSelectOptionEvent("EDIT");

    // modal Validation Condition Clear
    modalValidationConditionClear('#userEditModal input[type="text"]', '#userEditModal #error-message');

    // modal close
    modalCloseEvent('#userEditModal');
}

// User management - User menu confirm Modal : DELETE, LOCK, UNLOCK
function userMenuConfirmModalOn(obj) {
    let id = $(obj).attr("id");
    let title = "";
    let onclickFunctionName = "";
    switch (id) {
        case "deleteUserButton":
            title = "Delete";
            onclickFunctionName = "deleteUser();";
            break;

        case "lockUserButton":
            title = "Lock";
            onclickFunctionName = "updateUserStatus();";
            break;

        case "unlockUserButton":
            title = "Unlock";
            onclickFunctionName = "updateUserStatus();";
            break;
    }

    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="userMenuConfirmModal">
            <div class="common-modal-style">
                <div class="modal-top">
                    <button type="button" class="modal-close-button">
                        <img src="/images/modal-close-mark.svg" alt="close modal button">
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>
                            User ${title}
                        </h3>
                    </div>
                    
                    <img src="/images/modal-warning-mark.svg" alt="경고표시">
                    
                    <p class="check-guide">Do you want to proceed&#63;</p>
                    
                    <div class="modal-two-button-wrap">
                        <button type="button" class="common-btn-style-cancel common-button-frame modal-close-button">Cancel</button>
                        <button type="button" class="common-btn-style-blue-deep common-button-frame" id="yesButton">Yes</button>
                    </div>
                </div>
        </div>
    `;

    modalArea.innerHTML= html;
    $('#userMenuConfirmModal').show();

    updateDomAttribute('#userMenuConfirmModal #yesButton', 'onclick', onclickFunctionName);
    modalCloseEvent('#userMenuConfirmModal');
}

// Reset password Modal - User management, User Profile
function userResetPasswordModalOn(menuType, targetUseId, userStatus) {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="userResetPasswordModal">
            <div class="common-modal-style">
                <div class="modal-top">
                    <button type="button" class="modal-close-button">
                        <img src="/images/modal-close-mark.svg" alt="close modal button">
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>User Reset Password</h3>
                        <p>Please enter your new password</p>
                    </div>
                    <ul class="modal-input-wrap">
                        <li>
                            <h4>User Id</h4>
                            <input type="text" id="userId" disabled value="${targetUseId}">
                        </li>`;

                        // user profile
                        if(menuType === menuTypes[1]) {
                            html += `
                            <li>
                                <h4>Old Password</h4>
                                <input type="password" placeholder="xxxxxxxx" id="currentPassword" autocomplete="off">
                            </li>
                            `;
                        }

                        html += `
                        <li>
                            <h4>New Password</h4>
                            <input type="password" placeholder="xxxxxxxx" id="newPassword" autocomplete="off">
                        </li>
                        <li>
                            <h4>Confirm Password</h4>
                            <input type="password" placeholder="xxxxxxxx" id="confirmPassword" autocomplete="off">
                        </li>
                    </ul>
                    
                    <div class="modal-validation-guide">
                        <p id="error-message" class="error-guide-message"></p>
                    </div>
                    
                    <button type="button" class="common-btn-style-blue-deep common-button-frame" onclick="userResetPassword('${menuType}', '${userStatus}');">Save</button>
                </div>
            </div>
        </div>`;


    modalArea.innerHTML= html;
    $('#userResetPasswordModal').show();

    // modal close
    modalCloseEvent('#userResetPasswordModal');

    // modal Validation Condition Clear
    modalValidationConditionClear('#userResetPasswordModal input[type="password"]', '#userResetPasswordModal #error-message');
}

// Tab menu - User Profile Modal(Common)
function userProfileModalOn() {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="userProfileModal">
            <div class="common-modal-style">
                <div class="modal-top">
                    <button type="button" class="modal-close-button">
                        <img src="static/images/modal-close-mark.svg" alt="close modal button">
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>User Profile</h3>
                    </div>
                    <ul class="modal-input-wrap">
                        <li>
                            <h4>User Id</h4>
                            <input type="text" id="userId">
                        </li>
                        <li>
                            <h4>First Name</h4>
                            <input type="text" id="firstName" autocomplete="off">
                        </li>
                        <li>
                            <h4>Last Name</h4>
                            <input type="text" id="lastName" autocomplete="off">  
                        </li>
                        <li>
                            <h4>Password</h4>
                            <div class="modal-input-button-wrap">
                                <button type="button" class="change-button common-button-frame">Change</button>
                            </div>
                        </li>
                    </ul>
                    <div class="modal-validation-guide">
                        <p id="error-message" class="error-guide-message"></p>
                    </div>
                    <div class="modal-two-button-wrap">
                        <button type="button" class="common-btn-style-cancel common-button-frame modal-close-button">Cancel</button>
                        <button type="button" class="common-btn-style-blue-deep common-button-frame modal-close-button">Save</button>
                    </div>
                </div>
            </div>
        </div>`;

    modalArea.innerHTML= html;
    $('#userProfileModal').show();

    $('.modal-close-button').click(function(){
        $('#userProfileModal').hide();
    });
}

// Login - set init password Modal(NON ACTIVE USER)
function setInitUserPasswordModalOn(errorType) {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="setInitUserPasswordModal">
            <div class="common-modal-style">
                <div class="modal-top">
                    <button type="button" class="modal-close-button">
                        <img src="/images/modal-close-mark.svg" alt="close modal button">
                    </button>
                </div>
                <div class="modal-content">
                    <div class="modal-title-wrap">`;

                if(errorType === errorTypes.LOGIN_NON_ACTIVE) {
                    html += ` <h3>Set User Init Password</h3>`;
                }

                if(errorType === errorTypes.EXPIRE_PASSWORD) {
                    html += ` <h3>Reset Password</h3>`;
                }

            html+=  `<p>Please enter your new password</p>
                    </div>
                    <ul class="modal-input-wrap">
                        <li>
                            <h4>Old Password</h4>
                            <input type="password" placeholder="xxxxxxxx" id="currentPassword" autocomplete="off">
                        </li>
                        <li>
                            <h4>New Password</h4>
                            <input type="password" placeholder="xxxxxxxx" id="newPassword" autocomplete="off">
                        </li>
                        <li>
                            <h4>Confirm Password</h4>
                            <input type="password" placeholder="xxxxxxxx" id="confirmPassword" autocomplete="off">
                        </li>
                    </ul>
                    
                    <div class="modal-validation-guide">
                        <p id="error-message" class="error-guide-message"></p>
                    </div>
                    
                    <button type="button" class="common-btn-style-blue-deep common-button-frame" onclick="setInitUserPassword('${errorType}')">Save</button>
                </div>
            </div>
        </div>`;

    modalArea.innerHTML= html;
    $('#setInitUserPasswordModal').show();

    // modal close
    modalCloseEvent('#setInitUserPasswordModal');

    // modal Validation Condition Clear
    modalValidationConditionClear('#setInitUserPasswordModal input[type="password"]', '#setInitUserPasswordModal #error-message');
}

// common success modal
function commonSuccessModalOn(message) {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="commonSuccessModal">
            <div class="common-modal-style">
                <div class="modal-top"></div>
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>
                            success
                        </h3>
                    </div>
                    <img src="/images/modal-success-mark.svg" alt="success">
                    <p class="check-guide">
                        ${message}
                    </p>
                    <div class="modal-two-button-wrap">
                        <button type="button" class="common-btn-style-blue-deep common-button-frame modal-close-button">OK</button>
                    </div>
                </div>
            </div>
        </div>`;

    modalArea.innerHTML= html;
    $('#commonSuccessModal').show();

    // modal close
    modalCloseEvent('#commonSuccessModal');
}

// common error modal
function commonErrorModalOn(message, errorType) {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
        <div class="modal" id="commonErrorModal">
            <div class="common-modal-style">
                <div class="modal-top"></div>
                <div class="modal-content">
                    <div class="modal-title-wrap">
                        <h3>Sorry</h3>
                    </div>
                    <img src="/images/modal-warning-mark.svg" alt="warning">
                    <p class="check-guide">
                        ${message}
                    </p>
                    
                    <div class="modal-two-button-wrap">`;

                    if(errorType === errorTypes.LOGIN_NON_ACTIVE || errorType === errorTypes.EXPIRE_PASSWORD) {
                        html += `<button type="button" class="common-btn-style-blue-deep common-button-frame" onclick="setInitUserPasswordModalOn('${errorType}');">OK</button>`;
                    } else {
                        html += `<button type="button" class="common-btn-style-blue-deep common-button-frame modal-close-button">OK</button>`;
                    }

            html += `</div>
                </div>
            </div>
        </div>
    `;

    modalArea.innerHTML= html;
    $('#commonErrorModal').show();

    // modal close
    modalCloseEvent('#commonErrorModal');
}

// common Export excel loading Modal
function exportExcelLoadingModalOn() {
    const modalArea = document.getElementById('modalArea');
    modalArea.innerHTML = "";

    let html = `
            <div class="modal" id="exportExcelLoadingModal">
                <div class="common-modal-style">
                    <div class="modal-top"></div>
                    <div class="modal-content">
                        <div class="modal-title-wrap">
                            <h3>
                                Processing
                            </h3>
                        </div>

                        <div class="loading-circle">
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                        </div>
                        
                        <p class="check-guide">
                            Download will be ready soon
                        </p>
                    </div>
                </div>
            </div>`;

    modalArea.innerHTML= html;
    $('#exportExcelLoadingModal').show();
}


// ======= Modal feature ===================================================================================================

function modalValidationConditionClear(inputSelector, errorMessageSelector) {
    $(`${inputSelector}`).on('input', function() {
        let isPassed = true;
        $(this).removeClass('uncorrect');

        $(`${inputSelector}`).each(function(index, item) {
            let value = $(item).val().trim();
            if(value === '' || value.length === 0) {
                isPassed = false;
            }
        });

        if(isPassed) {
            setModalErrorMessageArea(errorMessageSelector, '', 'display', 'none')
        }
    });
}

function setModalErrorMessageAreaWhenServerException(inputSelector, errorMessageSelector, errorMessage, cssAttr, cssValue) {
    $(`${inputSelector}`).addClass('uncorrect');
    setModalErrorMessageArea(errorMessageSelector, errorMessage, cssAttr, cssValue);
}

function setModalErrorMessageArea(selector, errorMessage, cssAttr, cssValue) {
    updateDomHtml(selector, errorMessage);
    updateDomCss(selector, cssAttr, cssValue);
}

function modalCloseEvent(modalSelector) {
    $('.modal-close-button').on('click', function() {
        $(`${modalSelector}`).hide();
    })
}

function modalSelectOptionEvent(modalName) {
    let selectHead = document.querySelector('.modal-selected')
    let selectSpan = selectHead.querySelector('span');
    let optionWrap = document.querySelector('.modal-options');
    let options = optionWrap.querySelectorAll('li');

    selectHead.addEventListener('click', function () {
        if (optionWrap.style.display === 'none' || optionWrap.style.display === '') {
            optionWrap.style.display = 'block';
        } else {
            optionWrap.style.display = 'none';
        }
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            let selectedText = option.textContent;

            selectSpan.textContent = selectedText;
            optionWrap.style.display = 'none';
        });
    });

    if(modalName === "ADD") {
        let defaultOption = options[0];
        selectSpan.textContent = defaultOption.textContent;
    }
}


// ====== Common Feature =======================================================================================================
// User management, User profile
function startResetPasswordSelf(userId, userStatus) {
    $('#userProfileModal').hide();
    userResetPasswordModalOn(menuTypes[1], userId, userStatus);
}