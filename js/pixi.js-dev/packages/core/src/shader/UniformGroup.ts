import type { Dict } from '@pixi/utils';
import type { UniformsSyncCallback } from './utils';

let UID = 0;

/**
 * Uniform group holds uniform map and some ID's for work
 *
 * @class
 * @memberof PIXI
 */
export class UniformGroup
{
    public readonly uniforms: Dict<any>;
    public readonly group: boolean;
    public id: number;
    syncUniforms: Dict<UniformsSyncCallback>;
    dirtyId: number;
    static: boolean;

    /**
     * @param {object} [uniforms] - Custom uniforms to use to augment the built-in ones.
     * @param {boolean} [_static] - Uniforms wont be changed after creation
     */
    constructor(uniforms: Dict<any>, _static?: boolean)
    {
        /**
         * uniform values
         * @member {object}
         * @readonly
         */
        this.uniforms = uniforms;

        /**
         * Its a group and not a single uniforms
         * @member {boolean}
         * @readonly
         * @default true
         */
        this.group = true;

        // lets generate this when the shader ?
        this.syncUniforms = {};

        /**
         * dirty version
         * @protected
         * @member {number}
         */
        this.dirtyId = 0;

        /**
         * unique id
         * @protected
         * @member {number}
         */
        this.id = UID++;

        /**
         * Uniforms wont be changed after creation
         * @member {boolean}
         */
        this.static = !!_static;
    }

    update(): void
    {
        this.dirtyId++;
    }

    add(name: string, uniforms: Dict<any>, _static?: boolean): void
    {
        this.uniforms[name] = new UniformGroup(uniforms, _static);
    }

    static from(uniforms: Dict<any>, _static?: boolean): UniformGroup
    {
        return new UniformGroup(uniforms, _static);
    }
}
