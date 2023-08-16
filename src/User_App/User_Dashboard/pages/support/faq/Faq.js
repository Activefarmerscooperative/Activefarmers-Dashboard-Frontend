import { Icon } from '@iconify/react';
import "./faq.css";
import React, { useState } from 'react';

function Accordion(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [iconToggle, setIconToggle] = useState("");

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        setIconToggle(!iconToggle);
    }

    return (
        <div>
            <div className="accordion">
                <div className="accordion-header" onClick={handleToggle}>
                    <p>
                        {props.title}
                    </p>

                    <Icon icon={!isExpanded ? "material-symbols:expand-circle-down-outline-rounded" : "material-symbols:expand-circle-up-outline-rounded"} className='faq-icons' />
                </div>
                {isExpanded && (
                    <div className="accordion-content">
                        <p>
                            {props.content}
                        </p>

                    </div>
                )}
            </div>
            <hr />
        </div>

    );
}

function Fag() {

    const accordionData = [
        {
            title: 'How can I apply for a loan on your website?',
            content: 'Applying for a loan on our website is quick and easy. Simply visit our loan application page and fill out the required information. Once submitted, our team will review your application and get back to you with a decision within a specified timeframe.',
        },
        {
            title: 'What are the interest rates and repayment terms for your loans?',
            content: 'Our interest rates and repayment terms vary depending on the type and amount of loan you are applying for. We strive to offer competitive interest rates and flexible repayment options to suit your needs. You can find detailed information about our loan products on our website or by contacting our customer support team.',
        },
        {
            title: 'Can I make early loan repayments or pay off my loan ahead of schedule?',
            content: 'Yes, we encourage early loan repayments and provide flexibility for our customers. If you wish to pay off your loan ahead of schedule, you can do so without incurring any penalties or additional fees. Simply contact our customer support team, and they will assist you with the necessary steps.',
        },
        {
            title: 'How do I open a savings account with your institution?',
            content: 'Opening a savings account with us is a straightforward process. You can begin by filling out an online application form on our website or by visiting our nearest branch. You will need to provide some personal information and identification documents. Once your application is approved, you will receive details about your new savings account.',
        },
        {
            title: 'What are the benefits of saving with your institution compared to other banks?',
            content: 'There are several benefits to saving with us. We offer competitive interest rates on savings accounts, ensuring that your money grows steadily over time. Additionally, we provide personalized customer service, convenient online banking options, and various tools to help you manage and track your savings effectively.',
        },
        {
            title: 'Are my deposits insured by a government agency?',
            content: 'Yes, your deposits are insured by the Federal Deposit Insurance Corporation (FDIC) up to the maximum allowed by law. This means that in the unlikely event of our institution experiencing financial difficulties, your deposits are protected, providing you with peace of mind.',
        },
    ];

    

    return (
        <div className="faq ">
            <div className="my-3">
                <p className='faq-descr'>
                    Certainly! Here are six frequently asked questions (FAQs) for a loans and savings website, along with their answers:
                </p>

                <div className="faq-list p-0 mt-5">
                    <hr />
                    {accordionData.map((data, index) => (
                        <Accordion key={index} title={data.title} content={data.content} />
                    ))
                    }
                </div>

            </div>
        </div>
    );
}

export default Fag;
