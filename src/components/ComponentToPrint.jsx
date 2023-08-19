/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { ReportHeader, TopBar, TableList, ReportBody, ReportFooter, InstitutionDetails, ReportPaperContainer } from './styles/ReportStyledComponents';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    // FORM PROCESSING AND RESPONSE PROVISION
    const { project } = props;

    return (
        <ReportPaperContainer ref={ref}>
            <TopBar>
                <img src='/construc-logo.png' alt='' />
                <InstitutionDetails>
                    <p>Location: Kigali, Rwanda</p>
                    <p>Email: info@rab.gov.rw</p>
                    <p>Phone: 0780599839</p>
                </InstitutionDetails>
            </TopBar>
            <ReportHeader>
                <h2>{project.name}</h2>
                <h3>{project.code}</h3>
                
                <div className='report-period'>
                    <div className='left'>
                        <p>Report period: Year 2023</p>
                    </div>
                    <div right='right'>
                        <p>Generated on: {new Date().toDateString()}</p>
                        <p>By: Impuhwe Stella</p>
                    </div>
                </div>
            </ReportHeader>

            <ReportBody>
                <p>The table bellow contains milk production data from all provinces in Rwanda</p>

                <TableList>
                    <thead>
                        <tr>
                            <th>Province</th>
                            <th>Quantity in Litres</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kigali City</td>
                            <td>100000</td>
                        </tr>
                        <tr>
                            <td>Northern province</td>
                            <td>470000</td>
                        </tr>
                        <tr>
                            <td>Southern province</td>
                            <td>500000</td>
                        </tr>
                        <tr>
                            <td>Eastern province</td>
                            <td>600000</td>
                        </tr>
                        <tr>
                            <td>Western province</td>
                            <td>440000</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>2110000</td>
                        </tr>
                    </tbody>
                </TableList>
            </ReportBody>

            <ReportFooter>
                <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
            </ReportFooter>
        </ReportPaperContainer>
    )
})