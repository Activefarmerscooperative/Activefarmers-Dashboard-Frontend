import { Icon } from '@iconify/react';
import "./faq.css"


// export default function Faq() {
//     return (
//         <div className="faq ">
//             <div className="my-3">
//                 <ul className="faq-list p-0">
//                     <li>
//                         <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                         <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                     </li>
//                     <li>
//                         <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                         <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                     </li>
//                     <li>
//                         <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                         <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                     </li>
//                     <li>
//                         <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                         <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                     </li>
//                     <li>
//                         <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                         <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                     </li>
//                     <li>
//                         <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                         <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                     </li>
//                     <li>
//                     <p>Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et </p>
//                     <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
//                 </li>
//                 </ul>
//             </div>

//         </div>
//     )
// }

import React, { useState } from 'react';

function Accordion(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div>
            <div className="accordion">
                <div className="accordion-header" onClick={handleToggle}>
                    <p>
                        {props.title}
                    </p>

                    <Icon icon="material-symbols:add-circle-outline-rounded" className='faq-icons' />
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
          title: 'Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et ',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et ',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et ',
          content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. ',
        },
      ];
    
    return (
        <div className="faq ">
            <div className="my-3">
                <div className="faq-list p-0">

                {accordionData.map((data, index) => (
        <Accordion key={index} title={data.title} content={data.content} />
      ))}
                    {/* <Accordion title="Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et " content="Content for Section 1" className="li" />
                    <Accordion title="Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et " content="Content for Section 2" className="li" />
                    <Accordion title="Lorem ipsum dolor sit amet consectetur. Nunc augue vulputate lectus integer. Eget sed quisque et " content="Content for Section 3" className="li" /> */}
                </div>

            </div>
        </div>
    );
}

export default Fag;
