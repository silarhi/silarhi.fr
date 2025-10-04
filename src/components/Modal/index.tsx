'use client'

import { ReactNode, useEffect, useRef } from 'react'

import { XMark } from '@/components/Icons'

interface ModalProps {
    show: boolean
    onHide: () => void
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    centered?: boolean
    backdrop?: 'static' | boolean
    children: ReactNode
}

interface ModalHeaderProps {
    closeButton?: boolean
    children: ReactNode
}

interface ModalTitleProps {
    children: ReactNode
}

interface ModalBodyProps {
    children: ReactNode
}

interface ModalFooterProps {
    children: ReactNode
}

export function ModalHeader({ closeButton, children }: ModalHeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            {children}
            {closeButton && (
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => {
                        const event = new CustomEvent('modal-close')
                        window.dispatchEvent(event)
                    }}
                >
                    <XMark className="w-6 h-6" />
                </button>
            )}
        </div>
    )
}

export function ModalTitle({ children }: ModalTitleProps) {
    return <h2 className="text-xl font-bold text-gray-900">{children}</h2>
}

export function ModalBody({ children }: ModalBodyProps) {
    return <div className="p-4 text-gray-900">{children}</div>
}

export function ModalFooter({ children }: ModalFooterProps) {
    return <div className="flex items-center justify-end gap-2 p-4 border-t text-gray-900">{children}</div>
}

export default function Modal({ show, onHide, size = 'md', centered = false, backdrop = true, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClose = () => onHide()
        window.addEventListener('modal-close', handleClose)
        return () => window.removeEventListener('modal-close', handleClose)
    }, [onHide])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && backdrop !== 'static') {
                onHide()
            }
        }

        if (show) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [show, onHide, backdrop])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (backdrop !== 'static' && e.target === modalRef.current) {
            onHide()
        }
    }

    if (!show) return null

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    }

    return (
        <div
            ref={modalRef}
            className={`fixed inset-0 z-50 flex ${centered ? 'items-center' : 'items-start pt-20'} justify-center bg-black bg-opacity-50`}
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} mx-4 max-h-[90vh] overflow-y-auto`}
            >
                {children}
            </div>
        </div>
    )
}

Modal.Header = ModalHeader
Modal.Title = ModalTitle
Modal.Body = ModalBody
Modal.Footer = ModalFooter
