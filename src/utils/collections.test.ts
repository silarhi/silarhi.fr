import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

import { getAllClients } from './client'
import { contentDirectory } from './content'
import { getAllProjects, getClientLinksData, getProjectFilterData } from './project'
import { getAllServices, getServicesByTechnology } from './service'
import { getAllTechnologies } from './technology'

// Runs on the real content/ directory: every published file must pass its front matter schema
describe('content collections', () => {
    it('loads every client, technology, service and project without a front matter error', async () => {
        const [clients, technologies, services, projects] = await Promise.all([
            getAllClients(),
            getAllTechnologies(),
            getAllServices(),
            getAllProjects(),
        ])

        expect(clients.length).toBeGreaterThan(0)
        expect(technologies.length).toBeGreaterThan(0)
        expect(services.length).toBeGreaterThan(0)
        expect(projects.length).toBeGreaterThan(0)
    })

    it('keys each project by its directory name, newest first', async () => {
        const projects = await getAllProjects()
        const directories = fs.readdirSync(path.join(contentDirectory, 'projects'))

        for (const project of projects) {
            expect(directories).toContain(project.slug)
        }
        const dates = projects.map((project) => project.date.getTime())
        expect(dates).toEqual([...dates].sort((a, b) => b - a))
    })

    it('lists the iterations of a project oldest first', async () => {
        for (const project of await getAllProjects()) {
            const dates = project.iterations.map((iteration) => iteration.date.getTime())
            expect(dates).toEqual([...dates].sort((a, b) => a - b))
        }
    })

    it('ends an engagement after it started', async () => {
        for (const project of await getAllProjects()) {
            if (project.endDate) {
                expect(project.endDate.getTime(), project.slug).toBeGreaterThanOrEqual(project.date.getTime())
            }
        }
    })

    it('orders the services by their order field', async () => {
        const orders = (await getAllServices()).map((service) => service.order)
        expect(orders).toEqual([...orders].sort((a, b) => a - b))
    })

    it('finds the services linked to a technology', async () => {
        for (const service of await getAllServices()) {
            for (const technologySlug of service.technologies) {
                expect(await getServicesByTechnology(technologySlug)).toContain(service)
            }
        }
    })
})

describe('getProjectFilterData', () => {
    it('counts each technology, category, industry and client once per project', async () => {
        const { technologies, categories, industries, clients, projects } = await getProjectFilterData()
        const sum = (items: { projectCount: number }[]) => items.reduce((total, item) => total + item.projectCount, 0)

        expect(sum(technologies)).toBe(projects.reduce((total, project) => total + project.technologies.length, 0))
        expect(sum(categories)).toBe(projects.length)
        expect(sum(industries)).toBe(projects.length)
        expect(sum(clients)).toBe(projects.length)
    })
})

describe('getClientLinksData', () => {
    it('links a client to its only project, or to the projects filtered by client', async () => {
        const projects = await getAllProjects()

        for (const [clientSlug, { link, projectCount }] of await getClientLinksData()) {
            const clientProjects = projects.filter((project) => project.client.slug === clientSlug)
            expect(projectCount).toBe(clientProjects.length)
            expect(link).toBe(
                projectCount === 1 ? `/projets/${clientProjects[0].slug}` : `/projets?client=${clientSlug}`
            )
        }
    })
})
